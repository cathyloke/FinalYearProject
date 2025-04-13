export type RootStackParamList = {

    //App Navigator
    Cover: undefined;
    Login: undefined;
    Register: undefined;
    Logout: undefined;

    //Information
    TNC: undefined;

    //Bottom Tab
    Menu: undefined;
    HomeMenu: undefined;
    ItineraryMenu: undefined;
    BudgetMenu: undefined;
    ProfileMenu: undefined;

    //Home
    Home: undefined;
    Weather: undefined;
    Attraction: undefined;
    AttractionDetails: { productSlug: string };
    Hotel: undefined;
    HotelListings: {
        departure_date: string,
        arrival_date: string,
        dest_id: string,
        search_type: string
    };
    HotelDetails: { hotel: any };
    Flight: undefined;
    FlightDetails: { token: string };

    // Itinerary
    Itinerary: undefined;
    CreateItinerary: { type: 'Manual' | 'AI' };
    CreateItineraryDetails: { itineraryId: string };
    ViewItinerary: { itineraryId: string };
    UpdateItinerary: { itineraryId: string };
    UpdateItineraryDetails: { itineraryId: string }

    //Budget
    BudgetExpenses: undefined;
    BudgetDetails: { budgetName: string };
    CategoryDetails: { budgetName: string, categoryName: string };
    CreateBudget: undefined;
    UpdateBudget: { budgetName: string };
    AddExpenses: { budgetName: string };
    UpdateExpenses: { budgetName: string, categoryName: string, detailId: string };

    //Account Profile
    Account: undefined;
    AccountDataManage: undefined;
    Preferences: undefined;
    AboutUs: undefined;
    Feedback: undefined;
    HelpCentre: undefined;
    PrivacyAgreement: undefined;
    UserAgreement: undefined;

};
