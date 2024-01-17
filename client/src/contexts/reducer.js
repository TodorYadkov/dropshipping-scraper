import { REDUCER_TYPES } from '../util/constants.js';

export const reducer = (state, action) => {
	switch (action.type) {
		case REDUCER_TYPES.IS_SIDE_BAR_OPEN:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.PRODUCTS:
			return { ...state, [action.type]: action.value };

		case REDUCER_TYPES.ADD_PRODUCT:
			return { ...state, [REDUCER_TYPES.PRODUCTS]: [action.value, ...state[REDUCER_TYPES.PRODUCTS]] };

		case REDUCER_TYPES.UPDATE_PRODUCT:
			return { ...state, [REDUCER_TYPES.PRODUCTS]: state[REDUCER_TYPES.PRODUCTS].map(p => p._id === action.value._id ? action.value : p) };

		case REDUCER_TYPES.DELETE_PRODUCT:
			return { ...state, [REDUCER_TYPES.PRODUCTS]: state[REDUCER_TYPES.PRODUCTS].filter(p => p._id !== action.value._id) };

		case REDUCER_TYPES.GENERAL_STATISTIC:
			return { ...state, [action.type]: { ...state[action.type], ...action.value } };

		default:
			throw new Error('Unrecognized reducer type');
	}
};

// Description of state

// 	{
// 		"isSideBarOpen": false,
// 		"products":
//  	[
//  	{
// 			"_id": "65a0445c7171b35d23df59ca",
// 			"name": "Rolex Submariner \"Hulk\" Green Dial Men's Luxury Watch M116610LV-0002",
// 			"description": "We couldn't find description property",
// 			"priceAmazon": 22900,
// 			"priceEbay": 29092.03,
// 			"currencyAmazon": "USD",
// 			"currencyEbay": "USD",
// 			"imageURL": "https://m.media-amazon.com/images/I/712BY6k-jJL._AC_SY395_.jpg",
// 			"availability": "In Stock",
// 			"amazonUrl": "https://www.amazon.com/dp/B00VMZ3TW8",
// 			"ebayUrl": "https://www.ebay.com/itm/334782929825",
// 			"rating": 4,
// 			"error": null,
// 			"owner": "65845039861e6f68566e84c2",
// 			"createdAt": "2024-01-11T19:41:16.680Z",
// 			"updatedAt": "2024-01-13T13:26:36.217Z",
// 			"__v": 0,
// 			"priceEbayOriginal": 26500,    ---> PROPERTY IS ONLY IN REACT NOT IN DB !!!
// 			"currencyEbayOriginal": "EUR"  ---> PROPERTY IS ONLY IN REACT NOT IN DB !!!
// 			"profit": 6192.03			   ---> PROPERTY IS ONLY IN REACT NOT IN DB !!!
// 		}
// 		],
// 		"generalStatistic": {
// 				"extensionsCount": 3,
// 				"extensionsIsWork": 0,
// 				"extensionsIsLogin": 1,
// 				"extensionsNotWorked": 3,
// 				"productsCount": 8,
// 				"productsErrorCount": 0
// 		}
//  }