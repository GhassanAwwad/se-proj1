####################################################################### 
# Program Filename: energy_use_analysis
# Author: Ali Aljabali
# Date: 5/1/2023
# Description: This code prompts the user to enter the start and end
# years of the analysis, in addition of the energy type. After that, 
# it outputs total world power generation at the start and end years,
# in addition to the increase from the start to the end. Moreover,
# it displays the contribution of the specific energy type of the total
# power and the change in this contribution from the start to the end.
# Input: start year, end year, energy type
# Output: total power (start and end years), total power increase,
# contribution of specific energy type (start and end years), and the 
# change in this contribution.
####################################################################### 

import pandas as pd

energy_use_df = pd.read_csv("C:/Users/user/Desktop/ENGR 103 Assignment 2/"
                            "energy_use_terrawatthours.csv")


#######################################################################
# Function: find_power
# Description: Method that returns the power value during a specific year and for a 
# specific energy type. As requested, it uses a for loop to iterate through the rows
# and an if statement to identify the rows according to year and energy type.
# Parameters: year, energy_type, dataset
# Return values: It returns the energy value from the generation_twh column.
# Pre-Conditions: The year and energy type must have been input correctly.
# Post-Conditions: The returned value must be for the appropriate year and energy type.
####################################################################### 
def find_power(year, energy_type, dataset):
    for index, row in dataset.iterrows():
        if row["year"] == year and row["variable"] == energy_type:
            return row["generation_twh"]


#######################################################################
# Function: find_total_world_power
# Description: This method finds the total power for a specific year by adding up the clean
# and fossil power. The previously defined function find_power was used inside this function.
# Parameters: year, dataset
# Return values: total world power
# Pre-Conditions: The year must have been input appropriately.
# Post-Conditions: The returned value must be computed correctly for the appropriate year.
####################################################################### 
def find_total_world_power(year, dataset):
    clean_power = find_power(year, "Clean", dataset)
    fossil_power = find_power(year, "Fossil", dataset)
    return clean_power + fossil_power


#######################################################################
# Function: compute_fraction
# Description: This method  calculates the fraction of contribution of a specific power type 
# from the total power by dividing the specific power by the total power and multiplying by 
# 100. The two previously defined functions find_power and find_total_world_power were used 
# inside this function.
# Parameters: energy_type, year, dataset
# Return values: The fraction of the specific power to the total power.
# Pre-Conditions: The year and energy type must have been input correctly.
# Post-Conditions: The returned value must have a value between 0 and 100.
####################################################################### 
def compute_fraction(energy_type, year, dataset):
    total_power = find_total_world_power(year, dataset)
    specific_power = find_power(year, energy_type, dataset)
    return (specific_power / total_power) * 100

# The following two while loops are useful to ensure that the user inputs
# an appropriate year between 2000 and 2021. If they do not, they are 
# prompted to enter again.
while True:
    start_year = int(input("Enter the start year (2000-2021): "))
    if 2000 <= start_year <= 2021:
        break
    else:
        print("Invalid year. Please try again.")

while True:
    end_year = int(input("Enter the end year (2000-2021): "))
    if 2000 <= end_year <= 2021:
        break
    else:
        print("Invalid year. Please try again.")

# List of energy types that the user has to choose from
energy_types = ["Bioenergy", "Hydro", "Nuclear", "Other Renewables", "Solar",
                "Wind", "Coal", "Gas", "Other Fossil"]

# Prompting the user to input an energy type.
energy_type = input("Enter the energy type: ")

# Using a while loop to handle bad input. If the user enters a value NOT in
# the energy types list, they are prompted to enter again.
while energy_type not in energy_types:
    print("Invalid energy type. Please try again.")
    energy_type = input("Enter the energy type: ")

# We utilize the define function find_total_world_power to find the total 
# power during the start and end years. Then, we calculate the percentage
# increase.
total_power_start = find_total_world_power(start_year, energy_use_df)
total_power_end = find_total_world_power(end_year, energy_use_df)
power_increase_percentage = ((total_power_end - total_power_start) /
                             total_power_start) * 100

# Next, we utilize find_power to find the power of the specific energy 
# type at the start and end years. We calculate the percentage change.
energy_start = find_power(start_year, energy_type, energy_use_df)
energy_end = find_power(end_year, energy_type, energy_use_df)
energy_change_percentage = ((energy_end - energy_start) / energy_start) * 100

# Finally, we compute the contribution of the input energy type at the 
# start and end years.
energy_fraction_start = compute_fraction(energy_type, start_year, energy_use_df)
energy_fraction_end = compute_fraction(energy_type, end_year, energy_use_df)

# Print all the results as required in the example case.
print("The total world power generation in " + str(start_year) + " was "
      + str(total_power_start) + " terawatt-hours.")
print("The total world power generation in " + str(end_year) + " was "
      + str(total_power_end) + " terawatt-hours.")
print("Between years " + str(start_year) + " and " + str(end_year)
      + " the world power generation increased by "
      + str(power_increase_percentage) + "%.\n")

print("In year " + str(start_year) + ", "
      + str(energy_start) + " twh came from " + str(energy_type)
      + " accounting for " + str(energy_fraction_start) + "% of world power.")
print("In year " + str(end_year) + ", "
      + str(energy_end) + " twh came from " + str(energy_type)
      + " accounting for " + str(energy_fraction_end) + "% of world power.")
print("Between years " + str(start_year) + " and " + str(end_year)
      + " the " + str(energy_type) + " power generation changed by "
      + str(energy_change_percentage) + "%.")