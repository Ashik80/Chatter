using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
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
                        Code = "#abcde"
                    },
                    new AppUser
                    {
                        DisplayName = "Pranto",
                        UserName = "prantoPagla",
                        Email = "ragibibnehossain@gmail.com",
                        Code = "#abcde"
                    },
                    new AppUser
                    {
                        DisplayName = "Ninad",
                        UserName = "ninad420",
                        Email = "na.ninad60@gmail.com",
                        Code = "#abcde"
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
    }
}