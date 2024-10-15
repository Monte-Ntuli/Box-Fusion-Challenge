using EmployeeManager.Server.Services;
using EmployeeManager.Server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Server
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        readonly string AllowSpecificOrigins = "_AllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("https://localhost:5173","http://localhost:5173")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod();
                                  });
            });

            var dbConnection = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<EmployeesDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Employees", Version = "0.01" });
                c.CustomSchemaIds(type => type.ToString());
            });

            services.AddControllers();
            services.AddEndpointsApiExplorer();

            services.AddAutoMapper(typeof(MappingProfile));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }

        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "api v1"));
            }

            app.UseRouting();

            app.UseCors(AllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();

        }

    }
}
