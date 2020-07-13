using System.Linq;
using Domain;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!context.Users.Any())
            {
                var users = new AppUser[]
                {
                    new AppUser
                    {
                        DisplayName = "Ashik",
                        UserName = "ashik80",
                        Email = "ashikurrahman80forget.ar@gmail.com",
                        Code = "#ABCDEFG"
                    },
                    new AppUser
                    {
                        DisplayName = "Pranto",
                        UserName = "prantoPagla",
                        Email = "ragibibnehossain@gmail.com",
                        Code = "#BACDEFG"
                    },
                    new AppUser
                    {
                        DisplayName = "Ninad",
                        UserName = "ninad420",
                        Email = "na.ninad60@gmail.com",
                        Code = "#CABDEFG"
                    }
                };

                foreach(var user in users)
                {
                    await userManager.CreateAsync(user, "Passw0rd");
                }
            }
        }
    }
}