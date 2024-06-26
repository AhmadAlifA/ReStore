using Microsoft.EntityFrameworkCore;

namespace API.Enitities.OrderAggregate
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string PrictureUrl { get; set; }
    }
}