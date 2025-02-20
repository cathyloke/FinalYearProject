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
    ViewItinerary: undefined;
    UpdateItinerary: undefined;

    //Budget
    BudgetExpenses: undefined;
    BudgetDetails: undefined;
    CategoryDetails: undefined;
    CreateBudget: undefined;
    UpdateBudget: { budgetName: string };
    AddExpenses: undefined;
    UpdateExpenses: undefined;

    //Account Profile
    Account: undefined;
    AccountDataManage: undefined;
    AboutUs: undefined;
    Feedback: undefined;
    HelpCentre: undefined;
    PrivacyAgreement: undefined;
    UserAgreement: undefined;

};
