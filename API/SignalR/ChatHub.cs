using System.Threading.Tasks;
using Application.Message.Channel;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;
        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Authorize(Policy = "IsMember")]
        public async Task SendMessageToChannel(Send.Command command)
        {
            var message = await mediator.Send(command);

            await Clients.All.SendAsync("ReceiveMessageInChannel", message);
        }
    }
}