namespace kino.Controllers;

using Microsoft.AspNetCore.Mvc;
using kino.Models;
using kino.Services;
using AutoMapper;
using kino.Entities;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UsersController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        IEnumerable<User> users = await _userService.GetUsers();
        if (users == null) return NotFound();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        User user = await _userService.GetUserById(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult<SignInResponse>> SignIn(SignInRequest signInRequest)
    {
        User user = await _userService.SignIn(signInRequest);
        if (user == null) return BadRequest();
        SignInResponse signInResponse = _mapper.Map<SignInResponse>(user);
        return Ok(signInResponse);
    }

    [HttpPost("sign-up")]
    public async Task<ActionResult<SignInResponse>> SignUp(SignUpRequest signUpRequest)
    {
        User user = await _userService.SignUp(signUpRequest);
        if (user == null) return BadRequest();
        SignInRequest signInRequest = _mapper.Map<SignInRequest>(signUpRequest);
        return await SignIn(signInRequest);
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<SignInResponse>> UpdateUser(int id, UpdateUserRequest updateUserRequest)
    {
        User user = await _userService.UpdateUser(id, updateUserRequest);
        if (user == null) return BadRequest();
        SignInResponse signInResponse = _mapper.Map<SignInResponse>(user);
        return signInResponse;
    }
}