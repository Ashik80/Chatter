using System;
using System.Linq;
using System.Text;
using Application.Interfaces;
using Persistence;

namespace Infrastructure.Security
{
    public class CodeGenerator : ICodeGenerator
    {
        private readonly DataContext context;
        public CodeGenerator(DataContext context)
        {
            this.context = context;
        }

        public string GetUserCode()
        {
            var length = 7;

            var strBuilder = new StringBuilder();
            var random = new Random();

            char letter;

            for (int i = 0; i < length; i++)
            {
                var flt = random.NextDouble();
                var shift = Convert.ToInt32(Math.Floor(25 * flt));
                letter = Convert.ToChar(shift + 65);
                strBuilder.Append(letter);
            }

            var code = "#" + strBuilder.ToString();

            if (context.Users.Any(x => x.Code == code)) GetUserCode();

            return code;
        }
    }
}