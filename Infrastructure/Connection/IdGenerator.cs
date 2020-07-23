using System;
using System.Linq;
using System.Text;
using Application.Interfaces;
using Persistence;

namespace Infrastructure.Connection
{
    public class IdGenerator : IIdGenerator
    {
        private readonly DataContext context;
        public IdGenerator(DataContext context)
        {
            this.context = context;
        }

        public string GetCommonId()
        {
            var length = 5;

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

            var commonId = strBuilder.ToString();

            if (context.Friends.Any(x => x.FriendshipId == commonId)) GetCommonId();

            return commonId;
        }
    }
}