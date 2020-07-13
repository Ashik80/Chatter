using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Middleware;
using Application.Friends;
using Application.Interfaces;
using Application.Users;
using AutoMapper;
using Domain;
using FluentValidation.AspNetCore;
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
            services.AddControllers(opt => {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(opt => {
                opt.RegisterValidatorsFromAssemblyContaining<Login>();
            });

            services.AddAuthorization(opt => {
                opt.AddPolicy("IsAdmin", policy => {
                    policy.Requirements.Add(new IsAdminRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsAdminRequirementHandler>();

            services.AddDbContext<DataContext>(opt => 
                opt.UseSqlite(Configuration.GetConnectionString("chattercontext")));

            services.AddMediatR(typeof(Login.Handler).Assembly);

            services.AddAutoMapper(typeof(ListRequest.Query));

            var builder = services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
            });
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();
            identityBuilder.AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt => {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key")),
                    ValidateAudience = false
                };
            });

            services.AddScoped<IJwtGenerator, JwtGenerator>();

            services.AddScoped<ICodeGenerator, CodeGenerator>();

            services.AddScoped<IUserAccessor, UserAccessor>();
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

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
