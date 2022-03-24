using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReceByteBackend.Models.Baza;

namespace ReceByteBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        public ReceByteContext Context { get; set; }
        public TestController(ReceByteContext context)
        {
            Context = context;
        }

        
          
    }
}