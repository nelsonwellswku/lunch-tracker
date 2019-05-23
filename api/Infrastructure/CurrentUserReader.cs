using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Octogami.LunchTracker.Api.Infrastructure
{
    public class User
    {
        public int UserId { get; set; }
    }

    public interface ICurrentUserReader
    {
        User GetCurrentUser();
    }

    public class CurrentUserReader : ICurrentUserReader
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserReader(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public User GetCurrentUser()
        {
            var currentUser = _httpContextAccessor.HttpContext.User;
            if (currentUser != null)
            {
                return new User
                {
                    UserId = int.Parse(currentUser.Claims.First(x => x.Type == "appUserId").Value)
                };
            }

            return null;
        }
    }
}
