using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Octogami.LunchTracker.Api.Infrastructure.Exceptions;

namespace Octogami.LunchTracker.Api.Infrastructure.HttpMiddleware
{
    public class ExceptionToHttpResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionToHttpResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                switch (e)
                {
                    case ValidationException ve:
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(ve.Errors));
                        break;
                    default:
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 500;
                        var response = new
                        {
                            message = e.Message,
                        };
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                        break;
                }
            }
        }
    }

    public static class ExceptionToHttpMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionToHttpResponseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionToHttpResponseMiddleware>();
        }
    }
}
