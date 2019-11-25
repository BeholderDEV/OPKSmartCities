exports.populateJSON = (buses, tracks) =>
{
    for(var i in buses)
    {
        var bus = buses[i]
        //console.log(bus)
        if(bus.schedule != undefined)
        {
            var busSchedule = bus.schedule.schedule_id
            var schedules = tracks.filter(t => t.schedules.some(s => (s._id+"") == (busSchedule+"")))
            var schedule = schedules[0].schedules.filter(s => (s._id+"") == (busSchedule+""))
            bus.schedule.track = schedules[0].name
            bus.schedule.trackNumber = schedules[0].number
            bus.schedule.scheduleData = schedule
        }
        
    }

    return buses
}