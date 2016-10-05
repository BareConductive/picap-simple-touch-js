/*******************************************************************************

  Bare Conductive Pi Cap
  ----------------------

  simple-touch.js - simple MPR121 touch detection demo with stdout output

  Written for Raspberry Pi.

  Bare Conductive code written by Szymon Kaliski.

  This work is licensed under a Creative Commons Attribution-ShareAlike 3.0
  Unported License (CC BY-SA 3.0) http://creativecommons.org/licenses/by-sa/3.0/

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.

 *******************************************************************************/

var MPR121 = require('node-picap');
var mpr121;

try {
  // correct address for the Pi Cap - other boards may vary
  mpr121 = new MPR121('0x5C'); 
}

catch (e) {
  console.log(e);
  process.exit(1);
}

mpr121.on('data', function(data) {
  data.forEach(function(electrode, i) {
    if (electrode.isNewTouch) {
      console.log('electrode ' + i + ' was just touched');
    }
    else if (electrode.isNewRelease) {
      console.log('electrode ' + i + ' was just released');
    }
  });
});

// this allows us to exit the program via Ctrl+C while still exiting elegantly
process.on('SIGINT', function () {
  process.exit(0);
});
