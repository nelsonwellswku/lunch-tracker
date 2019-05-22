using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NSwag;
using NSwag.SwaggerGeneration.Processors.Security;
using Octogami.LunchTracker.Api.Features.Auth.SignIn;
using Octogami.LunchTracker.Api.Features.Infrastructure.Behaviors;
using Octogami.LunchTracker.Api.Infrastructure;
using Octogami.LunchTracker.Api.Infrastructure.Data;
using Octogami.LunchTracker.Api.Infrastructure.HttpMiddleware;

namespace api
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddOpenApiDocument();
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddEntityFrameworkSqlServer()
                    .AddDbContext<LunchTrackerContext>(options =>
                        options.UseSqlServer(Configuration.GetConnectionString("LunchTrackerDatabase"))
                    );

            services.Scan(scan => scan.FromAssemblyOf<Startup>()
                .AddClasses(classes => classes.AssignableTo(typeof(IValidator<>)))
                .AsImplementedInterfaces()
                .WithScopedLifetime());

            services.AddScoped<IJwtDecoder, JwtDecoder>();
            services.Decorate<IJwtDecoder, CachingJwtDecoder>();

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                    .AddCookie(options =>
                    {
                        options.Events.OnRedirectToLogin = ctx => Task.FromResult(ctx.Response.StatusCode = 401);
                        options.Events.OnRedirectToAccessDenied = ctx => Task.FromResult(ctx.Response.StatusCode = 403);
                    });

            services.AddScoped<ICurrentUserReader, CurrentUserReader>();

            services.AddHttpClient();
            services.AddHttpContextAccessor();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseExceptionToHttpResponseMiddleware();

            app.UseSwagger();
            app.UseSwaggerUi3();

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
