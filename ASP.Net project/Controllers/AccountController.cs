using ASP.Net_project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ASP.Net_project.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _db;

        // ✅ No return type for constructor
        public AccountController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                // Check if user exists in the database
                var user = _db.Users.FirstOrDefault(u => u.email == model.Email);
                if (user != null)
                {
                    // ✅ Verify password
                    bool isPasswordValid = BCrypt.Net.BCrypt.Verify(model.Password, user.password_hash);
                    if (isPasswordValid)
                    {
                        // ✅ Set authentication cookie
                        FormsAuthentication.SetAuthCookie(user.email, model.RememberMe);

                        // ✅ Redirect to returnUrl if valid
                        if (Url.IsLocalUrl(returnUrl))
                        {
                            return Redirect(returnUrl);
                        }
                        else
                        {
                            return RedirectToAction("Admin", "Account");
                        }
                    }
                }

                // ❌ User not found OR password incorrect
                ModelState.AddModelError("", "Invalid login attempt.");
            }

            // ❌ Something failed, redisplay form
            return View(new LoginViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Check if email already exists
                if (_db.Users.Any(u => u.email == model.Email))
                {
                    ModelState.AddModelError("", "Email is already taken.");
                    return View(model);
                }

                // Hash the password
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

                // Create new user object and save it
                var user = new User
                {
                    email = model.Email,
                    password_hash = hashedPassword
                };

                _db.Users.Add(user);
                _db.SaveChanges();

                // Redirect to login page
                return RedirectToAction("Login", "Account");
            }

            return View(model);
        }


        public ActionResult Admin()
        {
            return View();
        }

    }

   
}