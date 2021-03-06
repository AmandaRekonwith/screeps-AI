module.exports = function ()
{
	Creep.prototype.runHaulerMoveEnergyFromContainer = function ()
	{
		let room = this.room;
		let containerID = this.memory.job.targetID;
		let resource = Game.getObjectById(this.room.memory.environment.resourcesArray[0]);

		let currentTask = this.memory.currentTask;

		if (room.memory.jobs.haulerJobBoard.moveEnergyFromContainer[containerID])
		{
			if (currentTask == null || currentTask == "Getting Energy")
			{
				this.memory.currentTask = "Getting Energy";
				let container = Game.getObjectById(containerID);

				if(container.store[RESOURCE_ENERGY] <= 500)
				{
					this.memory.currentTask = null;
					room.memory.jobs.haulerJobBoard.moveEnergyFromContainer[containerID].creepID = null;
					this.memory.job = null;
				}

				let action = this.withdraw(container, RESOURCE_ENERGY);

				if (action == ERR_NOT_IN_RANGE)
				{
					this.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
				}

				if ( ((this.carry[RESOURCE_ENERGY] == this.carryCapacity) ||
					(this.carry[resource.mineralType] && this.carry[resource.mineralType] + this.carry[RESOURCE_ENERGY] == this.carryCapacity))
					&& this.memory.currentTask == "Getting Energy")
				{
					this.memory.job = null;
					if(this.ticksToLive < 1400)
					{
						this.memory.currentTask = "Renewing";
					}
					else
					{
						this.memory.currentTask = "Working";
					}
				}
			}
		}
	}
}