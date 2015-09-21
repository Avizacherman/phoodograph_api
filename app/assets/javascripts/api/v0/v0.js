//= require_self
//= require_tree ./components

var App = {
	currentLocation: {
		lat: 0,
		lng: 0
	},
	imageRotation: new Object,
	map: new Object,
	categoryList: ["Afghan", "African", "American (New)", "American (Traditional)", "Argentinean", "Asian Fusion", "Australian", "Austrian", "Bagels", "Bakeries", "Bar Food", "Barbecue", "Belgian", "Bistro", "Brazilian", "British", "Burgers", "Cafes &Coffeehouses", "Cajun & Creole", "Californian", "Caribbean", "Central American", "Central Asian", "Cheesesteaks", "Chicken", "Chinese", "Cocktails", "Crepes", "Cuban", "Delis", "Desserts", "Dim Sum", "Diners & Coffee Shops", "Dutch", "Eastern European", "Eclectic & International", "Ethiopian", "Filipino", "Fish & Chips", "French", "Gastropub", "German", "Greek", "Haitian", "Hawaiian", "Health Food", "Hot Dogs", "Indian", "Indonesian", "Irish", "Italian", "Jamaican", "Japanese", "Korean", "Kosher", "Latin American", "Local/Organic", "Malaysian", "Mediterranean", "Mexican", "Middle Eastern", "Moroccan", "New England", "Noodle Shops", "Nuevo Latino", "Other", "Pakistani", "Persian", "Peruvian", "Pizza", "Polish", "Portuguese", "Puerto Rican/Dominican", "Ramen", "Russian", "Salads", "Sandwiches", "Scandinavian", "Seafood", "Small Plates/Tapas", "Smoothies/Juice Bar", "Soups", "South American", "Soulfood/Southern", "Southwestern", "Spanish", "Sri Lankan", "Steakhouses", "Sushi", "Swiss", "Teahouse", "Thai", "Tibetan", "Turkish", "Vegan", "Venezuelan", "Vietnamese", " Wine Bar", " Wings"]
}
App.timezone = jstz.determine().name()
