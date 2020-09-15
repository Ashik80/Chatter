using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Middleware;
using API.SignalR;
using Application.Friends;
using Application.Interfaces;
using Application.Users;
using AutoMapper;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Connection;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(opt =>
            {
                opt.RegisterValidatorsFromAssemblyContaining<Login>();
            });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsAdmin", policy =>
                {
                    policy.Requirements.Add(new IsAdminRequirement());
                });
                opt.AddPolicy("IsMember", policy =>
                {
                    policy.Requirements.Add(new IsMemberRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsAdminRequirementHandler>();

            services.AddTransient<IAuthorizationHandler, IsMemberRequirementHandler>();

            services.AddDbContext<DataContext>(opt =>
                opt.UseSqlite(Configuration.GetConnectionString("chattercontext")));

            services.AddMediatR(typeof(Login.Handler).Assembly);

            services.AddAutoMapper(typeof(ListRequest.Query));

            var builder = services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
            });
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            identityBuilder.AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key")),
                    ValidateAudience = false
                };
                opt.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;

                        if(!string.IsNullOrWhiteSpace(accessToken) &&
                            path.StartsWithSegments("/chat"))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            services.AddScoped<IJwtGenerator, JwtGenerator>();

            services.AddScoped<ICodeGenerator, CodeGenerator>();

            services.AddScoped<IUserAccessor, UserAccessor>();

            services.AddScoped<IIdGenerator, IdGenerator>();

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                });
            });

            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}
