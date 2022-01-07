// functions for debouncing and making newtwork requests while searching for meal by name
var timeout_id;
function dilemma_for_network_request()
    {
        if(timeout_id == undefined)
        {
            timeout_id = setTimeout(make_network_request, 1000);
        }
        else
        {
            clearTimeout(timeout_id);
            timeout_id = setTimeout(make_network_request, 500);
        }
    }
    
    async function make_network_request()
    {
        let query = document.querySelector("#search_box").value;
        try{
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            let data = await res.json();
            // console.log(data);
            show_searchList(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    function show_searchList({meals})
    {
        //meals ----> array of obj
        // console.log(meals);
        let search_floating = document.querySelector("#search_floating");
        search_floating.style.display = "block";
        search_floating.innerHTML = "";

        meals.forEach(({idMeal, strMeal}) => {
            // console.log(idMeal, strMeal, strMealThumb);

            let p = document.createElement("p");
            p.setAttribute("id", idMeal);
            p.textContent = strMeal;

            search_floating.append(p);
        })
    }

    export {dilemma_for_network_request, make_network_request, show_searchList};
// --------------------------------------------------------------------------------------------->