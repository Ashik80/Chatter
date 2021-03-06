using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Channels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {
        private readonly IMediator mediator;
        public ChannelsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await mediator.Send(new Delete.Command{Id = id});
        }

        [HttpGet]
        public async Task<ActionResult<List<ChannelDto>>> List()
        {
            return await mediator.Send(new List.Query());
        }

        [HttpPost("add/{id}/{userId}")]
        [Authorize(Policy = "IsAdmin")]
        public async Task<ActionResult<Unit>> AddUser(Guid id, string userId)
        {
            return await mediator.Send(new AddUser.Command(id, userId));
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "IsMember")]
        public async Task<ActionResult<ChannelDto>> Details(Guid id)
        {
            return await mediator.Send(new Details.Query{Id = id});
        }
    }
}