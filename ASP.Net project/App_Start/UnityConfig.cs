using System.Web.Mvc;
using Unity;
using Unity.Mvc5;
using ASP.Net_project.Models;
using Microsoft.EntityFrameworkCore;
using Unity.Injection;

public static class UnityConfig
{
    public static void RegisterComponents()
    {
        var container = new UnityContainer();

        // ✅ Register ApplicationDbContext
        container.RegisterType<ApplicationDbContext>(new InjectionConstructor(
            new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer("Server=DESKTOP-S19U46J\\SQLEXPRESS;Database=Eatsy;Trusted_Connection=True;MultipleActiveResultSets=true")
                .Options));

        DependencyResolver.SetResolver(new UnityDependencyResolver(container));
    }
}