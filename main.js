
//controla poprawnosci wprowadzonych danych

var pole = document.getElementById("money");
pole.addEventListener("change", control);

function control(){
  if (pole.value < 0){
    alert("zmien na wartość dodatnią");
  }
}

// wywolanie funkcji calculate po nacisnienciu buttona "oblicz"

document.getElementById("oblicz").addEventListener("click",calculate);

//funkcja calculate

function calculate() {

 var kwota = document.getElementById("money").value;
  var code_value = document.getElementById('waluta_kon').value-1;
  console.log(code_value);

// pobranie danych od NBP i ich przeliczenie oraz wyswietlenie

fetch('http://api.nbp.pl/api/exchangerates/tables/a/last/1?format=json')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        var rat = resp[0].rates[code_value].mid;
        console.log(rat)

        endValue = Math.round((kwota/rat)* 10000) / 10000;
        console.log(endValue);

        var div = document.getElementById("output");
        div.textContent = kwota + " PLN" + "=" + endValue +" " + resp[0].rates[code_value].code + " ("+ resp[0].rates[code_value].currency + ")";

        var div2 = document.getElementById("output2");
        div2.textContent = " Obliczenia wykonane zgodnie z tabelą kursów średnich NBP z dnia: " + resp[0].effectiveDate;

          ;})
}
