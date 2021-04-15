const reminders = {
    "Medications": [
        "Take",
    ],
    "Bills": [
        "Pay cellphone bill",
        "Pay mastercard",
        "Payoff Creditcard",
        "Pay mortgage",
        "File taxes"
    ],
    "Appointments": [
        "meet up with",
        "meet with",
        "go to the doctor's office",
        "watch movie with",
        "go shopping with",
        "eat lunch with",
        "eat breakfast with",
        "eat dinner with",
        "lunch date",
        "dinner date",
        "watch movie",
        "go to church",
    ],
    "Tasks" : [
        "wake up",
        "go for a walk",
        "go to the park",
        "throw out garbage",
    ],
}

const drugs = ["Atorvastatin","Levothyroxine","Lisinopril","Metformin Hydrochloride","Amlodipine","Metoprolol","Albuterol","Omeprazole","Losartan Potassium","Simvastatin","Gabapentin","Acetaminophen","Hydrochlorothiazide","Sertraline Hydrochloride","Montelukast","Fluticasone","Amoxicillin","Furosemide","Pantoprazole Sodium","Acetaminophen","Prednisone","Escitalopram Oxalate","Fluoxetine Hydrochloride","Dextroamphetamine","Tramadol Hydrochloride","Insulin Glargine","Bupropion","Ibuprofen","Rosuvastatin","Pravastatin Sodium","Trazodone Hydrochloride","Tamsulosin Hydrochloride","Carvedilol","Meloxicam","Citalopram","Duloxetine","Alprazolam","Potassium","Clopidogrel Bisulfate","Aspirin","Ranitidine","Atenolol","Cyclobenzaprine","Glipizide","Methylphenidate","Azithromycin","Clonazepam","Oxycodone","Allopurinol","Venlafaxine","Hydrochlorothiazide","Warfarin","Propranolol Hydrochloride","Hydrochlorothiazide","Cetirizine","Estradiol","Ethinyl Estradiol","Lorazepam","Quetiapine Fumarate","Zolpidem Tartrate","Ergocalciferol","Budesonide","Spironolactone","Ondansetron","Insulin Aspart","Apixaban","Naproxen","Lamotrigine","Fluticasone Propionate","Pregabalin","Glimepiride","Diclofenac","Fenofibrate","Paroxetine","Clonidine","Loratadine","Diltiazem Hydrochloride","Hydroxyzine","Amitriptyline","Doxycycline","Ethinyl Estradiol","Lisdexamfetamine Dimesylate","Sitagliptin Phosphate","Latanoprost","Cephalexin","Tizanidine","Finasteride","Lovastatin","Topiramate","Insulin Lispro","Sulfamethoxazole","Buspirone Hydrochloride","Oseltamivir Phosphate","Ferrous Sulfate","Amoxicillin","Valsartan","Levetiracetam","Hydralazine Hydrochloride","Mirtazapine","Rivaroxaban","Aripiprazole","Oxybutynin","Esomeprazole","Alendronate Sodium","Folic Acid","Triamcinolone","Tiotropium","Thyroid","Ciprofloxacin","Isosorbide Mononitrate","Sumatriptan","Insulin Detemir","Benzonatate","Famotidine","Diazepam","Ropinirole Hydrochloride","Hydrochlorothiazide","Benazepril Hydrochloride","Metronidazole","Methocarbamol","Nifedipine","Baclofen","Methotrexate","Testosterone","Ezetimibe","Celecoxib","Guanfacine","Donepezil Hydrochloride","Hydroxychloroquine","Clindamycin","Divalproex Sodium","Morphine","Ethinyl Estradiol","Prednisolone","Enalapril Maleate","Pioglitazone","Cyanocobalamin","Norethindrone","Meclizine Hydrochloride","Valacyclovir","Albuterol Sulfate","Docusate","Liraglutide","Hydrocortisone","Verapamil Hydrochloride","Cefdinir","Nortriptyline Hydrochloride","Timolol","Dulaglutide","Promethazine Hydrochloride","Acyclovir","Fluconazole","Methylprednisolone","Metformin Hydrochloride","Ramipril","Dexmethylphenidate Hydrochloride","Brimonidine Tartrate","Oxcarbazepine","Risperidone","Levofloxacin","Chlorthalidone","Atomoxetine Hydrochloride","Polyethylene Glycol 3350","Calcium","Mupirocin","Ethinyl Estradiol","Drospirenone","Phentermine","Carbidopa","Omega-3-acid Ethyl Esters","Desogestrel","Guaifenesin","Rizatriptan Benzoate","Irbesartan","Progesterone","Doxazosin Mesylate","Linagliptin","Adalimumab","Nitrofurantoin","Budesonide","Amlodipine Besylate","Hydrochlorothiazide","Digoxin","Acetaminophen","Insulin Degludec","Ketoconazole","Nitroglycerin","Temazepam","Amiodarone Hydrochloride","Memantine Hydrochloride","Canagliflozin","Ketorolac Tromethamine","Liothyronine Sodium","Lithium","Dicyclomine Hydrochloride","Pramipexole Dihydrochloride","Nebivolol Hydrochloride","Terazosin","Magnesium","Colchicine","Sucralfate","Medroxyprogesterone Acetate","Glyburide","Carbamazepine","Gemfibrozil","Nystatin","Sildenafil","Prazosin Hydrochloride","Beclomethasone","Linaclotide","Desvenlafaxine","Insulin Human","Clobetasol Propionate","Empagliflozin","Lansoprazole","Erythromycin","Guaifenesin","Bumetanide","Dexlansoprazole","Mometasone","Estrogens","Hydromorphone Hydrochloride","Letrozole","Olanzapine","Levocetirizine Dihydrochloride","Cyclosporine","Dapagliflozin","Labetalol","Anastrozole","Mesalamine","Sodium","Mirabegron","Lidocaine","Mycophenolate Mofetil","Ofloxacin","Indomethacin","Penicillin V","Metoclopramide Hydrochloride","Olmesartan Medoxomil","Azelastine Hydrochloride","Emtricitabine","Epinephrine","Ipratropium","Tamoxifen Citrate","Lurasidone Hydrochloride","Buprenorphine","Calcitriol","Ranolazine","Dorzolamide Hydrochloride","Formoterol Fumarate","Betamethasone","Calcium","Tadalafil","Dextroamphetamine Sulfate","Methimazole","Umeclidinium Bromide","Umeclidinium Bromide","Diphenhydramine Hydrochloride","Ticagrelor","Fexofenadine Hydrochloride","Sotalol Hydrochloride","Sodium Fluoride","Insulin Isophane","Solifenacin Succinate","Flecainide Acetate","Benztropine Mesylate","Eszopiclone","Polymyxin B Sulfate","Phenytoin","Bromfenac Sodium","Torsemide","Sennosides","Tolterodine Tartrate","Bimatoprost","Etanercept","Travoprost","Minocycline Hydrochloride","Bisoprolol Fumarate","Nabumetone","Isotretinoin","Doxepin Hydrochloride","Primidone","Dexamethasone","Bisoprolol Fumarate","Exenatide","Chlorhexidine","Ethinyl Estradiol","Dutasteride","Modafinil","Olopatadine","Fentanyl","Telmisartan","Polyethylene Glycol 3350 With Electrolytes","Tretinoin","Dexamethasone","Pseudoephedrine","Insulin Human","Sacubitril","Pancrelipase Lipase","Brompheniramine Maleate"]
const names = ["Noah","Oliver","William","Elijah","James","Benjamin","Lucas","Mason","Ethan","Alexander","Henry","Jacob","Michael","Daniel","Logan","Jackson","Sebastian","Jack","Aiden","Emma","Ava","Sophia","Isabella","Charlotte","Amelia","Mia","Harper","Evelyn","Abigail","Emily","Ella","Elizabeth","Camila","Luna","Sofia","Avery","Mila","Aria"]
const times = ["6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM","12:00 AM","1:00 AM","2:00 AM"]
const frequency = ["everyday", "every other day", "every week", "every other week", "every monday", "every tuesday", "every Wednesday", "every Thursday", "every Friday", "every Saturday", "every Sunday"]
const quantities = ["1 pill of", "2 pills of", "3 pill of"]

module.exports = {
    reminders,
    names,
    drugs,
    quantities,
    times,
    frequency
}
