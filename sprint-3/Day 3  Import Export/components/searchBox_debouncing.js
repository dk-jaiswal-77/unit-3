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
            if(data.meals == null)
            {
                document.querySelector("#search_floating").style.display = "none";
            }
            else
            {
                show_searchList(data);
            }
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
            p.addEventListener("click", show_searchedMeal_recipe)

            search_floating.append(p);
        });

    }



    // eventListener function for event click on searchbox options---------------------------->

    function show_searchedMeal_recipe(event_obj)
    {
        document.querySelector("#search_floating").style.display = "none";
        let searchedMeal_id = event_obj.target.id;
        get_meal_recipe_by_id(searchedMeal_id);
    }

    async function get_meal_recipe_by_id(meal_id)
    {
        try{
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal_id}`);
            let {meals} = await response.json();
            // console.log(meals[0]);
            display_mealRecipe(meals[0]); // meals[0] is an object
        }
        catch (error){
            console.log(error);
        }
    }

    function display_mealRecipe(meal)
    {
        // console.log(meal);

        document.querySelector("#meals_container").style.display = "none";

        document.querySelector("#recipe_container").style.display = "block";

        let thumbnail = document.querySelector("#thumbnail");
        thumbnail.src = meal.strMealThumb;

        let ingredients = document.querySelector("#ingredients");
        
        let recipe = document.querySelector("#recipe");
        recipe.textContent = meal.strInstructions;

        let iframe = document.querySelector("iframe");
        iframe.src = meal.strYoutube;
        // console.log(meal.strYoutube);

        let mealName = document.querySelector("#mealName");
        mealName.textContent = meal.strMeal;

        // loop for getting all the ingredients 
        for(let i = 1; i >=1; i++)
        {
            if(meal[`strIngredient${i}`] == "")
            {
                break;
            }
            let div = document.createElement("div");

            let span1 = document.createElement("span");
            span1.textContent = meal[`strIngredient${i}`];

            let span2 = document.createElement("span");
            span2.textContent = meal[`strMeasure${i}`];

            div.append(span1, span2);

            ingredients.append(div);
        }
    }

    export {dilemma_for_network_request, make_network_request, show_searchList};
// --------------------------------------------------------------------------------------------->