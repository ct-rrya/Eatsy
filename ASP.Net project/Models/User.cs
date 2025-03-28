using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ASP.Net_project.Models
{
    public class User
    {
        [Key]  // Explicitly set as Primary Key
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-increment
        public int user_id { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string password_hash { get; set; }
    }
}