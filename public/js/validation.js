const title1= document.getElementsByName('title')
const description1= document.getElementsByName('description')
const cost1= document.getElementsByName('cost')
const departureDate1= document.getElementsByName('departureDate')
const errorElement = document.getElementById('error')



form.addEventListener('Submit',(e)=> {
    let messages=[]
    if (title1.value ==='' || title1 == null ) {
        messages.push('title can not be blank')
    }

    if (title1.length <=2)  {
        messages.push('Title should be atleast 3 characters length')
    }
    if (messages.length>0) {
        e.preventDefault();
        errorElement.innerText = messages.join(',')        
    }
}





