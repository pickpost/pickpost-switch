/**
 * Fireworm Plugin Class
 */

class FirewormPlugin {
  
	constructor(id, name = 'newPlugin') {
		this.id = id;
		this.name = name;
		this.isReady = false;
    
		this.eventList = {};
	}

	get id() {
		return this._id;
	}
	set id(value) {
		if (!value) {
			throw 'Plugin ID cannot be empty';
		}
		this._id = value.toLowerCase();
	}

	get name() {
		return this._name;
	}
	set name(value) {
		if (!value) {
			throw 'Plugin name cannot be empty';
		}
		this._name = value;
	}

	get fireworm() {
		return this._fireworm || undefined;
	}
	set fireworm(value) {
		if (!value) {
			throw 'fireworm cannot be empty';
		}
		this._fireworm = value;
	}

	/**
   * register an event
   * @public
   * @param string
   * @param function
   */
	on(eventName, callback) {
		this.eventList[eventName] = callback;
		return this;
	}

	/**
   * trigger an event
   * @public
   * @param string
   * @param mixed
   */
	trigger(eventName, data) {
		if (typeof this.eventList[eventName] === 'function') {
			// registered by `.on()` method
			this.eventList[eventName].call(this, data);
		} else {
			// registered by `.onXxx()` method
			let method = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
			if (typeof this[method] === 'function') {
				this[method].call(this, data);
			}
		}
		return this;
	}

}

export default FirewormPlugin;
