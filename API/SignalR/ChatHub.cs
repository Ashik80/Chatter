using System;
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

        public async Task SendMessageToChannel(Send.Command command)
        {
            var message = await mediator.Send(command);

            await Clients.Group(command.Id.ToString()).SendAsync("ReceiveMessageInChannel", message);
        }

        public async Task AddToChannel(string id)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, id);
        }

        public async Task RemoveFromChannel(string id)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, id);
        }
    }
}