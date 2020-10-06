import React from "react";

export default function NutritionFacts() {
  return (
    <div id="nutrition_facts" className="">
      <h2 className="nutrition-facts">Nutrition Facts</h2>

      <h2 className="food-description">Raman noodles - Noodles</h2>

      <form
        id="nutrition-facts-form"
        className="form"
        action="#"
        accept-charset="UTF-8"
        method="post"
      >
        <input name="utf8" type="hidden" value="✓" />
        <input
          type="hidden"
          name="authenticity_token"
          value="W+vJy5kjdEgBkOL5l/MD+L50Ep7cINQPyizQ04nc2FF1qtN8BMjQLD2O2VObdl3+kWVGuB8DpWA/iXC/oZdIbA=="
        />

        <ol className="fieldset">
          <li className="field">
            <label>Servings:</label>

            <input
              value="1.0"
              autocomplete="off"
              className="text short"
              onkeyup="remote_update('#nutrition_info', '/food/update_nutrition_facts_table/188892687', 'weight_id='+$('#food_entry_weight_id', $('#nutrition-facts-form')).attr('value')+'&amp;quantity='+this.value)"
              type="text"
              name="food_entry[quantity]"
              id="food_entry_quantity"
            />

            <select
              className="select"
              onchange="remote_update('#nutrition_info', '/food/update_nutrition_facts_table/188892687','weight_id='+this.value+'&amp;quantity='+$('#food_entry_quantity', $('#nutrition-facts-form')).attr('value'))"
              name="food_entry[weight_id]"
              id="food_entry_weight_id"
            >
              <option selected="selected" value="261814050">
                1 pack
              </option>
              <option value="261814051">1 container (2 pack)</option>
            </select>
          </li>
        </ol>
      </form>

      <div id="nutrition_info">
        <table id="nutrition-facts">
          <tbody>
            <tr>
              <td className="col-1">Calories</td>
              <td className="col-2">190</td>
              <td className="col-1">Sodium</td>
              <td className="col-2">830 mg</td>
            </tr>
            <tr>
              <td className="col-1">Total Fat</td>
              <td className="col-2">7 g</td>
              <td className="col-1">Potassium</td>
              <td className="col-2">0 mg</td>
            </tr>

            <tr>
              <td className="col-1 sub">Saturated</td>
              <td className="col-2">4 g</td>
              <td className="col-1">Total Carbs</td>
              <td className="col-2">26 g</td>
            </tr>

            <tr>
              <td className="col-1 sub">Polyunsaturated</td>
              <td className="col-2">0 g</td>
              <td className="col-1">Dietary Fiber</td>
              <td className="col-2">1 g</td>
            </tr>

            <tr>
              <td className="col-1 sub">Monounsaturated</td>
              <td className="col-2">0 g</td>
              <td className="col-1">Sugars</td>
              <td className="col-2">1 g</td>
            </tr>

            <tr>
              <td className="col-1 sub">Trans</td>
              <td className="col-2">0 g</td>
              <td className="col-1">Protein</td>
              <td className="col-2">4 g</td>
            </tr>

            <tr className="last">
              <td className="col-1">Cholesterol</td>
              <td className="col-2">0 mg</td>
              <td className="col-1">&nbsp;</td>
              <td className="col-2">&nbsp;</td>
            </tr>

            <tr className="alt">
              <td className="col-1">Vitamin A</td>
              <td className="col-2">0%</td>
              <td className="col-1">Calcium</td>
              <td className="col-2">0%</td>
            </tr>

            <tr className="last">
              <td className="col-1">Vitamin C</td>
              <td className="col-2">0%</td>
              <td className="col-1">Iron</td>
              <td className="col-2">8%</td>
            </tr>
          </tbody>
        </table>

        <p className="aclaration-6">
          *Percent Daily Values are based on a 2000 calorie diet. Your daily
          values may be higher or lower depending on your calorie needs.
        </p>
      </div>
    </div>
  );
}
