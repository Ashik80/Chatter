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

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> RemoveRequest(string id,
                                                            string predicate)
        {
            return await mediator.Send(new RemoveRequest.Command{Id = id, Predicate = predicate});
        }

        [HttpGet]
        public async Task<ActionResult<RequestDto>> ListRequest(string predicate)
        {
            return await mediator.Send(new ListRequest.Query(predicate));
        }
    }
}