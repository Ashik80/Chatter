using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Friends;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly IMediator mediator;
        public FriendsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Add(Add.Command command)
        {
            return await mediator.Send(command);
        }

        [HttpDelete("requests/{id}")]
        public async Task<ActionResult<Unit>> RemoveRequest(string id, string predicate)
        {
            return await mediator.Send(new RemoveRequest.Command(id, predicate));
        }

        [HttpGet("requests")]
        public async Task<ActionResult<RequestDto>> ListRequest(string predicate)
        {
            return await mediator.Send(new ListRequest.Query(predicate));
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Unit>> Accept(string id)
        {
            return await mediator.Send(new Accept.Command { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List<FriendDto>>> List()
        {
            return await mediator.Send(new List.Query());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await mediator.Send(new Delete.Command { Id = id });
        }
    }
}