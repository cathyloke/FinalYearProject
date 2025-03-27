export type RootStackParamList = {

    //App Navigator
    Cover: undefined;
    Cover2: undefined;
    Login: undefined;
    Register: undefined;
    Logout: undefined;

    //Information
    TNC: undefined;

    //Bottom Tab
    Menu: undefined;
    Home: undefined;
    ItineraryMenu: undefined;
    BudgetMenu: undefined;
    ProfileMenu: undefined;

    // Itinerary
    Itinerary: undefined;
    CreateItinerary: { type: 'Manual' | 'AI' };
    CreateItineraryDetails: { itineraryId: string };
    ViewItinerary: undefined;
    UpdateItinerary: undefined;

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
