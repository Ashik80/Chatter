using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ErrorHandlingMiddleware> logger;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            this.logger = logger;
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                await HandleException(context, ex, logger);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;

            switch(ex)
            {
                case RestException re:
                {
                    logger.LogError(ex, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int)re.Code;
                    break;
                }
                case Exception e:
                {
                    logger.LogError(ex, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(ex.Message) ? "Error" : ex.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
                }
            }

            if(errors != null)
            {
                var result = JsonSerializer.Serialize(new {errors});

                await context.Response.WriteAsync(result);
            }
        }
    }
}