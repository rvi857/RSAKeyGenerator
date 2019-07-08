function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

function gcd_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function getE(totient) {
	var eList = []
	for (var i = 2; i < totient; i++) {
		if (gcd_two_numbers(i, totient) === 1) {
			eList.push(i);
		}
	}
	return eList;
}

var prime1;
var prime2;
var modulus;
var totient;
var encryptor;
var decryptor;
var public_key;
var private_key;


function keygen() {
	prime1 = document.getElementById("prime1").value;
	if (!isPrime(prime1)) {
		alert("The first number isn't prime! Please try again!");
		document.getElementById("prime1").value = "";
		return;
	}
	prime2 = document.getElementById("prime2").value;
	if (!isPrime(prime2)) {
		alert("The second number isn't prime! Please try again!");
		document.getElementById("prime2").value = "";
		return;
	}
    document.getElementById("primes1").innerHTML = "Prime 1: " + prime1;
    document.getElementById("primes2").innerHTML = "Prime 2: " + prime2;
    modulus = prime1 * prime2;
    totient = (prime1 - 1)*(prime2 - 1);
    var k = document.getElementById("randomK").value;
    var possibleEs = getE(totient);
    if (possibleEs.length === 0) {
    	alert("Unfortunately, these two primes don't work. Please try again!");
    	document.getElementById("prime1").value = "";
    	document.getElementById("prime2").value = "";
    	return;
    }
    var randIndex = Math.floor(Math.random() * possibleEs.length);
    encryptor = possibleEs[randIndex];
    decryptor = 1 + k * totient / encryptor;
    document.getElementById("pubkey").value = "Public Key: " + modulus + ", " + encryptor;
}

