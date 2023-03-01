namespace kino.Services;

using kino.Entities;
using kino.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using AutoMapper;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public interface IUserService
{
    Task<IEnumerable<User>> GetUsers();
    Task<User> GetUserById(int id);
    Task<User> SignIn(SignInRequest signInRequest);
    Task<User> SignUp(SignUpRequest signUpRequest);
    Task<User> UpdateUser(int id, UpdateUserRequest updateUserRequest);
}

public class UserService : IUserService
{
    private readonly DatabaseContext _context;
    private readonly IMapper _mapper;

    public UserService(DatabaseContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
        List<User> users = await _context.Users.ToListAsync();
        users.ForEach(user => user.Reservations = _context.Reservations.Where(reservation => reservation.UserId == user.Id).ToList());
        return users;
    }

    public async Task<User> GetUserById(int id)
    {
        User user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        if (user == null) return null;
        user.Reservations = _context.Reservations.Where(reservation => reservation.UserId == user.Id).ToList();
        return user;
    }

    public async Task<User> SignIn(SignInRequest signInRequest)
    {
        User user = await _context.Users.SingleOrDefaultAsync(user => user.Email == signInRequest.Email);
        if (user == null || !BCrypt.Verify(signInRequest.Password, user.PasswordHash)) return null;
        user.Reservations = _context.Reservations.Where(reservation => reservation.UserId == user.Id).ToList();
        return user;
    }

    public async Task<User> SignUp(SignUpRequest signUpRequest)
    {
        if (_context.Users.Any(user => user.Email == signUpRequest.Email)) return null;
        User user = _mapper.Map<User>(signUpRequest);
        user.PasswordHash = BCrypt.HashPassword(signUpRequest.Password);
        user.Role = User.UserRole.User;
        EntityEntry<User> _user = await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return _user.Entity;
    }

    public async Task<User> UpdateUser(int id, UpdateUserRequest updateUserRequest)
    {
        User user = await GetUserById(id);
        if (user == null) return null;
        _mapper.Map(updateUserRequest, user);
        if (!string.IsNullOrEmpty(updateUserRequest.Password))
            user.PasswordHash = BCrypt.HashPassword(updateUserRequest.Password);
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }
}