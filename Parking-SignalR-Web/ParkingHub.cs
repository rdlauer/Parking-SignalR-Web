using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Parking_SignalR_Web
{
    public class ParkingHub : Hub
    {
        public void UpdateParkingAvailability(string s)
        {
            Clients.All.broadcastMessage(s);
        }   
    }
}