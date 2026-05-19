import csv
import random
import os

filename = 'donor_churn_dataset.csv'

rows = []

for i in range(1, 1001):
    donor_id = i
    age = random.randint(18, 85)
    
    # Generate base features
    donation_frequency = random.randint(1, 24) # donations per year
    average_donation = round(random.uniform(10.0, 500.0), 2)
    days_since_last_donation = random.randint(1, 730)
    campaign_engagement_score = random.randint(1, 10)
    
    total_donations_count = random.randint(1, 100)
    total_donations = round(average_donation * total_donations_count, 2)
    
    # Calculate churn probability
    # Normalize features to roughly 0-1 range
    norm_days = days_since_last_donation / 730.0
    norm_freq = donation_frequency / 24.0
    norm_eng = campaign_engagement_score / 10.0
    
    # Churn score
    # Higher days -> higher score. Higher freq/eng -> lower score.
    churn_score = norm_days * 0.6 - norm_freq * 0.4 - norm_eng * 0.4 + random.uniform(-0.2, 0.2)
    
    rows.append({
        'donor_id': donor_id,
        'age': age,
        'donation_frequency': donation_frequency,
        'average_donation': average_donation,
        'days_since_last_donation': days_since_last_donation,
        'campaign_engagement_score': campaign_engagement_score,
        'total_donations': total_donations,
        'score': churn_score
    })

# Sort by score to find the median for perfectly balanced dataset (500 yes, 500 no)
rows.sort(key=lambda x: x['score'])
median_score = rows[500]['score']

# Shuffle rows back to id order
rows.sort(key=lambda x: x['donor_id'])

final_data = []
for r in rows:
    churn = 'Yes' if r['score'] >= median_score else 'No'
    final_data.append([
        r['donor_id'],
        r['age'],
        r['donation_frequency'],
        r['average_donation'],
        r['days_since_last_donation'],
        r['campaign_engagement_score'],
        r['total_donations'],
        churn
    ])

with open(filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow([
        'donor_id', 'age', 'donation_frequency', 'average_donation', 
        'days_since_last_donation', 'campaign_engagement_score', 
        'total_donations', 'churn'
    ])
    writer.writerows(final_data)

print(f"Generated {len(final_data)} rows in {filename}")
