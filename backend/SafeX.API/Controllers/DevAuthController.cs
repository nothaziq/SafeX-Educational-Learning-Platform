using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace SafeX.API.Controllers;

// DEV-ONLY. Issues a real JWT for a seeded Admin user so the dashboard can be tested
// against live data before the Auth teammate's login flow is merged in.
// This endpoint refuses to run outside Development (see the environment check below),
// so it cannot become a backdoor in a real deployment. Remove this controller entirely
// once Group 22's Auth module is merged and provides real login.
[ApiController]
[Route("api/dev")]
public class DevAuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _config;
    private readonly IWebHostEnvironment _env;

    private const string DevAdminEmail = "dev-admin@safex.local";
    private const string DevAdminPassword = "DevAdmin!2345";

    public DevAuthController(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration config,
        IWebHostEnvironment env)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _config = config;
        _env = env;
    }

    [HttpPost("token")]
    public async Task<IActionResult> GetDevToken()
    {
        if (!_env.IsDevelopment())
        {
            return NotFound();
        }

        if (!await _roleManager.RoleExistsAsync("Admin"))
        {
            await _roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        var user = await _userManager.FindByEmailAsync(DevAdminEmail);
        if (user is null)
        {
            user = new IdentityUser
            {
                UserName = DevAdminEmail,
                Email = DevAdminEmail,
                EmailConfirmed = true,
            };

            var createResult = await _userManager.CreateAsync(user, DevAdminPassword);
            if (!createResult.Succeeded)
            {
                return StatusCode(500, createResult.Errors);
            }
        }

        if (!await _userManager.IsInRoleAsync(user, "Admin"))
        {
            await _userManager.AddToRoleAsync(user, "Admin");
        }

        var jwtKey = _config["Jwt:Key"] ?? "dev-placeholder-key-replace-me-32chars";
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email ?? DevAdminEmail),
            new(ClaimTypes.Role, "Admin"),
        };

        var credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials);

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}
