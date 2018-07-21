function Stopwatch() {
  let startTime = 0;
  let endTime = 0;
  let isStarted = false;

  Object.defineProperty(this, "duration", {
    get: function() {
      return endTime - startTime;
    }
  });

  Object.defineProperty(this, "startTime", {
    get: function() {
      return startTime;
    }
  });

  Object.defineProperty(this, "endTime", {
    get: function() {
      return endTime;
    }
  });

  Object.defineProperty(this, "isStarted", {
    get: function() {
      return isStarted;
    }
  });
}

Stopwatch.prototype.start = function() {
  if (this.isStarted) return console.error("Stopwatch is already started");
  this.startTime = Date.now();
  this.isStarted = true;
  console.log("started");
};

Stopwatch.prototype.stop = function() {
  if (!this.isStarted) return console.error("Stopwatch is not started");
  this.endTime = Date.now();
  this.isStarted = false;
  console.log("stopped");
};

Stopwatch.prototype.reset = function() {
  this.startTime = null;
  this.endTime = null;
  this.isStarted = false;
  console.log("stopwatch reset");
};

const sw = new Stopwatch();
console.log(sw.duration);
sw.start();
sw.stop();
console.log(sw.duration);
sw.reset();
sw.start();
sw.stop();
console.log(sw.duration);
