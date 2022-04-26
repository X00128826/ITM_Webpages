
const assert = require('chai').assert;
const index = require('src/dataAccess/test');



describe('Making sure times are being used to filter in the saerch bar', function() {

    it('Check to see if we get back 21.00', function() {
        let timeResults = index.actualClockTimes('21.00');
        assert.equal(timeResults, true)
    })

    it('Check to see if we get back 17.00', function() {
        let timeResults = index.actualClockTimes('17.00');
        assert.equal(timeResults, true)
    })

    it('Check to see if we get back five', function() {
        let timeResults = index.actualClockTimes('five');
        assert.equal(timeResults, false)
    })
})