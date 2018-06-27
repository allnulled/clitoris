const { expect, assert } = require("chai");
const deepEqual = require("deep-equal");

describe("Clitoris class", function() {
	var Clitoris = undefined;
	var clitoris = undefined;
	before(function() {});
	it("is retrievable as class", function(done) {
		Clitoris = require(__dirname + "/../src/clitoris.js").Clitoris;
		expect(typeof Clitoris).to.equal("function");
		done();
	});
	it("is instantiable", function(done) {
		clitoris = new Clitoris();
		expect(clitoris instanceof Clitoris).to.equal(true);
		done();
	});
	it("can parse strings correctly (as class)", function(done) {
		var output = Clitoris.parse(`
			{
			 @key1 [ :string:value1 ":s:value 2 with spaces" ]
			 @key2 [ :boolean:true :b:false ]
			 @key3 [ :number:100 :n:-100.99 ]
			 @key4 :null:
			 @key5 [ :undefined: :u: ]
			 @key6 [ [ [ :n:1 ] ] ]
			 @key7 { @key7.1 { @key7.1.1 { "@key7.1.1.1 with spaces" "simple string" } } }
			}
		`);
		var outputExpected = {
		  key1: [ "value1", "value 2 with spaces" ],
		  key2: [ true, false ],
		  key3: [ 100, -100.99 ],
		  key4: null,
		  key5: [ undefined, undefined ],
		  key6: [ [ [ 1 ] ] ],
		  key7: {
		    "key7.1": {
		      "key7.1.1": {
		        "key7.1.1.1 with spaces": "simple string"
		      }
		    }
		  }
		};
		expect(deepEqual(output, outputExpected)).to.equal(true);
		done();
	});
	it("can parse arrays correctly (as instance)", function(done) {
		var output = clitoris.parse([
			"{",
			"@key1",
			"[",
			":string:value1",
			":s:value 2 with spaces",
			"]",
			"@key2",
			"[",
			":boolean:true",
			":b:false",
			"]",
			"@key3",
			"[",
			":number:100",
			":n:-100.99",
			"]",
			"@key4",
			":null:",
			"@key5",
			"[",
			":undefined:",
			":u:",
			"]",
			"@key6",
			"[",
			"[",
			"[",
			":n:1",
			"]",
			"]",
			"]",
			"@key7",
			"{",
			"@key7.1",
			"{",
			"@key7.1.1",
			"{",
			"@key7.1.1.1 with spaces",
			"simple string",
			"}",
			"}",
			"}",
			"}"
		]);
		var outputExpected = {
		  key1: [ "value1", "value 2 with spaces" ],
		  key2: [ true, false ],
		  key3: [ 100, -100.99 ],
		  key4: null,
		  key5: [ undefined, undefined ],
		  key6: [ [ [ 1 ] ] ],
		  key7: {
		    "key7.1": {
		      "key7.1.1": {
		        "key7.1.1.1 with spaces": "simple string"
		      }
		    }
		  }
		};
		expect(deepEqual(output, outputExpected)).to.equal(true);
		done();
	});
	it("throws error when parameters are not string or array", function(done) {
		assert.throws(() => {
			Clitoris.parse(69);
		});
		done();
	});
	it("throws error when arrays are not closed properly", function(done) {
		assert.throws(() => {
			var out = Clitoris.parse("[ [ [ :n:0 ] ]");
			console.log(out);
		});
		done();
	});
	it("throws error when objects are not closed properly", function(done) {
		assert.throws(() => {
			var out = Clitoris.parse("{ { { @0 :n:0 } }");
			console.log(out);
		});
		done();
	});
	it("concatenates values when object properties are repeated", function(done) {
		var out = Clitoris.parse("{ @1 :n:1 @1 :n:2 }");
		expect(typeof out).to.equal("object");
		expect("1" in out).to.equal(true);
		expect(out["1"]).to.be.an("array");
		expect(out["1"].length).to.equal(2);
		expect(out["1"][0]).to.equal(1);
		expect(out["1"][1]).to.equal(2);
		done();
	});
});
