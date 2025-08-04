import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, OrdinalEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import joblib
from collections import Counter

# Load dataset
df = pd.read_csv("weather_outfit_dataset_final.csv")

# Features and target
categorical_cols = ['Weather', 'TimeOfDay', 'LocationType', 'Gender', 'AgeGroup']
numerical_cols = ['Temperature', 'Humidity', 'WindSpeed']


# Encode target variable
label_encoder = LabelEncoder()
df['Outfit'] = label_encoder.fit_transform(df['Outfit'].astype(str))

# Encode input features
ordinal_encoder = OrdinalEncoder()
df[categorical_cols] = ordinal_encoder.fit_transform(df[categorical_cols].astype(str))




# -----------------------------------
# (1) HEATMAP of Correlation Matrix
# -----------------------------------

corr = df[numerical_cols + categorical_cols + ['Outfit']].corr()

plt.figure(figsize=(10, 6))
sns.heatmap(
    corr,
    annot=True,
    cmap='coolwarm',
    fmt='.2f',
    linewidths=0.5
)
plt.title("Correlation Heatmap (Numerical + Categorical + Outfit)")
plt.show()


# -----------------------------------
# (2) BOXPLOTS for Outlier Detection
# -----------------------------------
all_features = numerical_cols + categorical_cols + ['Outfit']

for col in all_features:
    plt.figure(figsize=(5,4))
    plt.boxplot(df[col].dropna())
    plt.title(f'Boxplot of {col}')
    plt.ylabel(col)
    plt.show()


# -----------------------------------
# (3) HISTOGRAMS (Distribution)
# -----------------------------------
for col in numerical_cols:
    plt.figure(figsize=(6,4))
    plt.hist(df[col].dropna(), bins=20)
    plt.title(f'Histogram of {col}')
    plt.xlabel(col)
    plt.ylabel('Frequency')
    plt.show()


# -----------------------------------
# (4) CATEGORY-WISE BAR CHARTS
# -----------------------------------
for cat in categorical_cols:
    plt.figure(figsize=(6,4))
    counts = df[cat].value_counts()
    plt.bar(counts.index.astype(str), counts.values)
    plt.title(f'Bar chart of {cat}')
    plt.xlabel(cat)
    plt.ylabel('Count')
    plt.xticks(rotation=45)
    plt.show()


# -----------------------------------
# (5) SCATTER PLOTS between features & Outfit
# -----------------------------------

if df['Outfit'].dtype == 'object':
    df['Outfit_enc'] = pd.factorize(df['Outfit'])[0]
else:
    df['Outfit_enc'] = df['Outfit']

for col in numerical_cols:
    plt.figure(figsize=(6,4))
    plt.scatter(df[col], df['Outfit_enc'])
    plt.title(f'Scatter plot: {col} vs Outfit')
    plt.xlabel(col)
    plt.ylabel('Outfit (encoded)')
    plt.show()


# Split features/target
X = df[numerical_cols + categorical_cols]
y = df['Outfit']

# -----------------------------------
# Class Balancing with SMOTE (Synthetic Minority Oversampling Technique)
# -----------------------------------

print("Before SMOTE:", Counter(y))
min_samples_required = 3
class_counts = Counter(y)
valid_classes = [cls for cls, count in class_counts.items() if count >= min_samples_required]
mask = y.isin(valid_classes)
X_filtered, y_filtered = X[mask], y[mask]

# Apply SMOTE
sm = SMOTE(random_state=42, k_neighbors=1)
X_res, y_res = sm.fit_resample(X_filtered, y_filtered)
print("After SMOTE:", Counter(y_res))

# -----------------------------------
# Train-Test Split
# -----------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X_res, y_res, test_size=0.2, random_state=42, stratify=y_res
)

# -----------------------------------
# Model Training 
# -----------------------------------


# (1) Logistic Regression

lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(X_train, y_train)

Y_pred = lr.predict(X_test)
acc = accuracy_score(Y_pred, y_test)
print(f"Logistic Regression Accuracy: {acc:.4f}")

# (2) Decision Tree Classifier

dtc = DecisionTreeClassifier(
    max_depth=10,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42
)

dtc.fit(X_train, y_train)

Y_pred = dtc.predict(X_test)
acc1 =accuracy_score(Y_pred, y_test)
print(f"Decision Tree Accuracy: {acc1:.4f}")

# (3) Random Forest Classifier

# Grid search for Random Forest
param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [15, 20],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2]
}

model = RandomForestClassifier(random_state=42)
grid = GridSearchCV(model, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid.fit(X_train, y_train)

y_pred = grid.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Random Forest Accuracy: {acc:.4f}")

# (4) K-Nearest Neighbors Classifier

knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train, y_train)   

Y_pred = knn.predict(X_test)
acc2 = accuracy_score(Y_pred, y_test)
print(f"KNN Accuracy: {acc2:.4f}")

# -----------------------------------
# Model Comparison 
# -----------------------------------


import matplotlib.pyplot as plt

# Model names and their corresponding accuracies
models = ['Logistic Regression', 'Decision Tree', 'KNN', 'Random Forest']
accuracies = [0.4654, 0.8079, 0.8737, 0.9637]

# Set up the plot
plt.figure(figsize=(10, 6))
bars = plt.bar(models, accuracies, color=['#FF9999', '#66B2FF', '#99FF99', '#FFD700'])

# Annotate each bar with its accuracy value
for bar, acc in zip(bars, accuracies):
    plt.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.01,
             f'{acc:.4f}', ha='center', va='bottom', fontsize=12)

# Add titles and labels
plt.title('Model Accuracy Comparison', fontsize=16)
plt.ylabel('Accuracy', fontsize=14)
plt.ylim(0, 1.05)
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Show the plot
plt.tight_layout()
plt.show()


# Save model and encoders

main_model = grid.best_estimator_
joblib.dump(main_model, 'outfit_predictor.pkl')
joblib.dump(label_encoder, 'outfit_label_encoder.pkl')
joblib.dump(ordinal_encoder, 'outfit_feature_encoder.pkl')
joblib.dump(X.columns.tolist(), 'feature_columns.pkl')



