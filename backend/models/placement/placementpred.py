import pickle

import pandas as pd
import numpy as np
import os

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# -------------------- LOAD DATA --------------------
def load_data(path):
    if not os.path.exists(path):
        print(" File not found. Check path!")
        exit()

    df = pd.read_csv(path)

    # Drop unnecessary columns
    df = df.drop(["student_id"], axis=1)

    # Handle missing values
    df = df.fillna("None")

    return df


# -------------------- PREPROCESS --------------------
def preprocess_data(df):
    X = df.drop("placed", axis=1)
    y = df["placed"]

    categorical_cols = X.select_dtypes(include=["object"]).columns
    numerical_cols = X.select_dtypes(include=["int64", "float64"]).columns

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numerical_cols),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
        ]
    )

    return X, y, preprocessor


# -------------------- TRAIN MODEL --------------------
def train_model(X, y, preprocessor):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(random_state=42)

    pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("model", model)
    ])

    param_grid = {
        "model__n_estimators": [100, 200],
        "model__max_depth": [5, 10, None],
        "model__min_samples_split": [2, 5],
        "model__min_samples_leaf": [1, 2]
    }

    grid = GridSearchCV(pipeline, param_grid, cv=5, scoring="accuracy", n_jobs=-1)
    grid.fit(X_train, y_train)

    best_model = grid.best_estimator_

    y_pred = best_model.predict(X_test)

    print("\n===== MODEL PERFORMANCE =====")
    print("Best Parameters:", grid.best_params_)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    return best_model


# -------------------- USER INPUT --------------------
def predict_student(model):
    print("\n===== ENTER STUDENT DETAILS =====")

    data = {
        "gender": input("Gender (Male/Female): "),
        "age": int(input("Age: ")),
        "degree": input("Degree (BE/BTech): "),
        "branch": input("Branch: "),
        "cgpa": float(input("CGPA: ")),
        "backlogs": int(input("Backlogs: ")),
        "internships": int(input("Internships: ")),
        "certifications": int(input("Certifications: ")),
        "coding_skills": int(input("Coding Skills (1-10): ")),
        "communication_skills": int(input("Communication Skills (1-10): ")),
        "aptitude_score": float(input("Aptitude Score: ")),
        "projects": int(input("Projects: ")),
        "company_type": input("Company Type (None/Product/Service): "),
        "package_lpa": float(input("Expected Package LPA: "))
    }

    input_df = pd.DataFrame([data])

    prediction = model.predict(input_df)
    probability = model.predict_proba(input_df)

    print("\n===== RESULT =====")
    print("Prediction:", "Placed" if prediction[0] == 1 else "Not Placed")
    print("Placement Readiness Score:", round(probability[0][1], 3))


# -------------------- MAIN --------------------
def main():
    print(" Training Placement Readiness Model...\n")

    df = load_data("Dataset.csv")

    X, y, preprocessor = preprocess_data(df)

    model = train_model(X, y, preprocessor)
    # ✅ SAVE MODEL HERE
    # import pickle
    # with open("placement_model.pkl", "wb") as f:
    #     pickle.dump(model, f)

    # print(" Model saved successfully!")
    print("👉 Saving model now...")

    with open("placement_model.pkl", "wb") as f:
        pickle.dump(model, f)

    print("✅ Model saved successfully!")

    while True:
        predict_student(model)

        cont = input("\nDo you want to predict another student? (y/n): ")
        if cont.lower() != 'y':
            print("\n Exiting...")
            break


# -------------------- RUN --------------------
if __name__ == "__main__":
    main()