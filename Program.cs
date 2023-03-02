using System.Text.Json.Serialization;
using kino.Models;
using kino.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var emailConfiguration = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();
if (emailConfiguration != null) builder.Services.AddSingleton(emailConfiguration);

builder.Services.AddDbContext<DatabaseContext>(options =>
    // options.UseNpgsql("Server=127.0.0.1; Port=5432; Database=kino; Userid=postgres; Password=SuperUser1!;"));
    options.UseNpgsql("Server=127.0.0.1; Port=5432; Database=kino; Userid=postgres; Password=postgres;"));

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()))
    .AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
    
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IViewingService, ViewingService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
