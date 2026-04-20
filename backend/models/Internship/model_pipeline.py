# -------------------------------
# IMPORTS
# -------------------------------
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# -------------------------------
# LOAD DATA
# -------------------------------
df = pd.read_csv("internship_dataset_20000.csv")

# -------------------------------
# CLEANING
# -------------------------------
df = df.dropna()

# -------------------------------
# PREPROCESSING
# -------------------------------

# Skills → list
df['skills'] = df['skills'].apply(lambda x: x.split('|'))

# Encode skills
mlb = MultiLabelBinarizer()
skills_encoded = pd.DataFrame(
    mlb.fit_transform(df['skills']),
    columns=mlb.classes_
)

# Encode categorical
le_domain = LabelEncoder()
df['domain_interest'] = le_domain.fit_transform(df['domain_interest'])

le_exp = LabelEncoder()
df['experience_level'] = le_exp.fit_transform(df['experience_level'])

le_target = LabelEncoder()
df['internship_role'] = le_target.fit_transform(df['internship_role'])

# Drop original skills
df = df.drop(columns=['skills'])

# Combine
df_final = pd.concat([df, skills_encoded], axis=1)

# -------------------------------
# SPLIT DATA
# -------------------------------
X = df_final.drop(columns=['internship_role', 'student_id'])
y = df_final['internship_role']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -------------------------------
# TRAIN MODEL
# -------------------------------
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("Train Accuracy:", model.score(X_train, y_train))
print("Test Accuracy:", model.score(X_test, y_test))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# -------------------------------
# PREDICTION FUNCTION (FINAL 🔥)
# -------------------------------
def recommend_internship(
    cgpa,
    skills,
    projects_count,
    domain_interest,
    certifications,
    experience_level,
    communication_skill,
    hackathons,
    github_score
):
    # Step 1: Create input df
    input_df = pd.DataFrame([{
        "cgpa": cgpa,
        "skills": skills,
        "projects_count": projects_count,
        "domain_interest": domain_interest,
        "certifications": certifications,
        "experience_level": experience_level,
        "communication_skill": communication_skill,
        "hackathons": hackathons,
        "github_score": github_score
    }])

    # Step 2: Skills preprocessing
    input_df['skills'] = input_df['skills'].apply(lambda x: x.split('|'))

    skills_encoded_input = pd.DataFrame(
        mlb.transform(input_df['skills']),
        columns=mlb.classes_
    )

    # Step 3: Encode categorical
    input_df['domain_interest'] = le_domain.transform(input_df['domain_interest'])
    input_df['experience_level'] = le_exp.transform(input_df['experience_level'])

    # Step 4: Drop skills
    input_df = input_df.drop(columns=['skills'])

    # Step 5: Combine
    final_input = pd.concat([input_df, skills_encoded_input], axis=1)

    # Step 6: Match columns
    final_input = final_input.reindex(columns=X.columns, fill_value=0)

    # Step 7: Predict
    pred = model.predict(final_input)

    # Step 8: Decode
    result = le_target.inverse_transform(pred)

    return result[0]


result = recommend_internship(
    cgpa=7.0,
    skills="C++|DSA",
    projects_count=2,
    domain_interest="Software Development",
    certifications=1,
    experience_level="Beginner",
    communication_skill=5,
    hackathons=0,
    github_score=50
)

print("Recommended Internship:", result)

result2= recommend_internship(
    cgpa= 8.2,
    skills= "C++|DSA|Python",
    projects_count= 4,
    domain_interest= "Software Development",
    certifications= 2,
    experience_level= "Intermediate",
    communication_skill= 7,
    hackathons= 2,
    github_score= 75

)
print("Recommended Internship:", result2)

result3 = recommend_internship(
    cgpa=9.4,
    skills="Python|AI|Deep Learning",
    projects_count=6,
    domain_interest="AI",
    certifications=5,
    experience_level="Advanced",
    communication_skill=9,
    hackathons=4,
    github_score=92
)

print("Recommended Internship:", result3)