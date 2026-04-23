-- ============================================================
-- Seed: 100 Official USCIS Civics Test Questions (pre-2021 version)
-- Source: USCIS 100 Civics Questions and Answers (English)
-- https://www.uscis.gov/citizenship/find-study-materials-and-resources
-- ============================================================

INSERT INTO public.civics_questions (question, answers, category, format) VALUES

-- ============================================================
-- AMERICAN GOVERNMENT
-- A: Principles of American Democracy (Q1–12)
-- ============================================================

-- 1
('What is the supreme law of the land?',
 ARRAY['the Constitution'],
 'principles_of_democracy', 'standard'),

-- 2
('What does the Constitution do?',
 ARRAY['sets up the government', 'defines the government', 'protects basic rights of Americans'],
 'principles_of_democracy', 'standard'),

-- 3
('The idea of self-government is in the first three words of the Constitution. What are these words?',
 ARRAY['We the People'],
 'principles_of_democracy', 'standard'),

-- 4
('What is an amendment?',
 ARRAY['a change (to the Constitution)', 'an addition (to the Constitution)'],
 'principles_of_democracy', 'standard'),

-- 5
('What do we call the first ten amendments to the Constitution?',
 ARRAY['the Bill of Rights'],
 'principles_of_democracy', 'standard'),

-- 6
('What is one right or freedom from the First Amendment?',
 ARRAY['speech', 'religion', 'assembly', 'press', 'petition the government'],
 'principles_of_democracy', 'standard'),

-- 7
('How many amendments does the Constitution have?',
 ARRAY['twenty-seven (27)'],
 'principles_of_democracy', 'standard'),

-- 8
('What did the Declaration of Independence do?',
 ARRAY['announced our independence (from Great Britain)', 'declared our independence (from Great Britain)', 'said that the United States is free (from Great Britain)'],
 'principles_of_democracy', 'standard'),

-- 9
('What are two rights in the Declaration of Independence?',
 ARRAY['life', 'liberty', 'pursuit of happiness'],
 'principles_of_democracy', 'standard'),

-- 10
('What is freedom of religion?',
 ARRAY['You can practice any religion, or not practice a religion.'],
 'principles_of_democracy', 'standard'),

-- 11
('What is the economic system in the United States?',
 ARRAY['capitalist economy', 'market economy'],
 'principles_of_democracy', 'standard'),

-- 12
('What is the "rule of law"?',
 ARRAY['Everyone must follow the law.', 'Leaders must obey the law.', 'Government must obey the law.', 'No one is above the law.'],
 'principles_of_democracy', 'standard'),

-- ============================================================
-- B: System of Government (Q13–47)
-- ============================================================

-- 13
('Name one branch or part of the government.',
 ARRAY['Congress', 'legislative', 'President', 'executive', 'the courts', 'judicial'],
 'system_of_government', 'standard'),

-- 14
('What stops one branch of government from becoming too powerful?',
 ARRAY['checks and balances', 'separation of powers'],
 'system_of_government', 'standard'),

-- 15
('Who is in charge of the executive branch?',
 ARRAY['the President'],
 'system_of_government', 'standard'),

-- 16
('Who makes federal laws?',
 ARRAY['Congress', 'Senate and House (of Representatives)', '(U.S. or national) legislature'],
 'system_of_government', 'standard'),

-- 17
('What are the two parts of the U.S. Congress?',
 ARRAY['the Senate and House (of Representatives)'],
 'system_of_government', 'standard'),

-- 18
('How many U.S. Senators are there?',
 ARRAY['one hundred (100)'],
 'system_of_government', 'standard'),

-- 19
('We elect a U.S. Senator for how many years?',
 ARRAY['six (6)'],
 'system_of_government', 'standard'),

-- 20
('Who is one of your state''s U.S. Senators now?',
 ARRAY['Answers will vary. [District of Columbia residents and residents of U.S. territories should answer that D.C. (or the territory where the applicant lives) has no U.S. Senators.]'],
 'system_of_government', 'standard'),

-- 21
('The House of Representatives has how many voting members?',
 ARRAY['four hundred thirty-five (435)'],
 'system_of_government', 'standard'),

-- 22
('We elect a U.S. Representative for how many years?',
 ARRAY['two (2)'],
 'system_of_government', 'standard'),

-- 23
('Name your U.S. Representative.',
 ARRAY['Answers will vary. [Residents of territories with nonvoting Delegates or Resident Commissioners may provide the name of that Delegate or Commissioner. Also acceptable is any statement that the territory has no (voting) Representatives in Congress.]'],
 'system_of_government', 'standard'),

-- 24
('Who does a U.S. Senator represent?',
 ARRAY['all people of the state'],
 'system_of_government', 'standard'),

-- 25
('Why do some states have more Representatives than other states?',
 ARRAY['(because of) the state''s population', '(because) they have more people', '(because) some states have more people'],
 'system_of_government', 'standard'),

-- 26
('We elect a President for how many years?',
 ARRAY['four (4)'],
 'system_of_government', 'standard'),

-- 27
('In what month do we vote for President?',
 ARRAY['November'],
 'system_of_government', 'standard'),

-- 28
('What is the name of the President of the United States now?',
 ARRAY['Visit uscis.gov/citizenship/testupdates for the name of the President of the United States.'],
 'system_of_government', 'standard'),

-- 29
('What is the name of the Vice President of the United States now?',
 ARRAY['Visit uscis.gov/citizenship/testupdates for the name of the Vice President of the United States.'],
 'system_of_government', 'standard'),

-- 30
('If the President can no longer serve, who becomes President?',
 ARRAY['the Vice President'],
 'system_of_government', 'standard'),

-- 31
('If both the President and the Vice President can no longer serve, who becomes President?',
 ARRAY['the Speaker of the House'],
 'system_of_government', 'standard'),

-- 32
('Who is the Commander in Chief of the military?',
 ARRAY['the President'],
 'system_of_government', 'standard'),

-- 33
('Who signs bills to become laws?',
 ARRAY['the President'],
 'system_of_government', 'standard'),

-- 34
('Who vetoes bills?',
 ARRAY['the President'],
 'system_of_government', 'standard'),

-- 35
('What does the President''s Cabinet do?',
 ARRAY['advises the President'],
 'system_of_government', 'standard'),

-- 36
('What are two Cabinet-level positions?',
 ARRAY['Secretary of Agriculture', 'Secretary of Commerce', 'Secretary of Defense', 'Secretary of Education', 'Secretary of Energy', 'Secretary of Health and Human Services', 'Secretary of Homeland Security', 'Secretary of Housing and Urban Development', 'Secretary of the Interior', 'Secretary of Labor', 'Secretary of State', 'Secretary of Transportation', 'Secretary of the Treasury', 'Secretary of Veterans Affairs', 'Attorney General', 'Vice President'],
 'system_of_government', 'standard'),

-- 37
('What does the judicial branch do?',
 ARRAY['reviews laws', 'explains laws', 'resolves disputes (disagreements)', 'decides if a law goes against the Constitution'],
 'system_of_government', 'standard'),

-- 38
('What is the highest court in the United States?',
 ARRAY['the Supreme Court'],
 'system_of_government', 'standard'),

-- 39
('How many justices are on the Supreme Court?',
 ARRAY['nine (9)'],
 'system_of_government', 'standard'),

-- 40
('Who is the Chief Justice of the United States now?',
 ARRAY['John Roberts (John G. Roberts, Jr.)'],
 'system_of_government', 'standard'),

-- 41
('Under our Constitution, some powers belong to the federal government. What is one power of the federal government?',
 ARRAY['to print money', 'to declare war', 'to create an army', 'to make treaties'],
 'system_of_government', 'standard'),

-- 42
('Under our Constitution, some powers belong to the states. What is one power of the states?',
 ARRAY['provide schooling and education', 'provide protection (police)', 'provide safety (fire departments)', 'give a driver''s license', 'approve zoning and land use'],
 'system_of_government', 'standard'),

-- 43
('Who is the Governor of your state now?',
 ARRAY['Answers will vary. [District of Columbia residents should answer that D.C. does not have a Governor.]'],
 'system_of_government', 'standard'),

-- 44
('What is the capital of your state?',
 ARRAY['Answers will vary. [District of Columbia residents should answer that D.C. is not a state and does not have a capital. Residents of U.S. territories should name the capital of the territory.]'],
 'system_of_government', 'standard'),

-- 45
('What are the two major political parties in the United States?',
 ARRAY['Democratic and Republican'],
 'system_of_government', 'standard'),

-- 46
('What is the political party of the President now?',
 ARRAY['Visit uscis.gov/citizenship/testupdates for the political party of the President.'],
 'system_of_government', 'standard'),

-- 47
('What is the name of the Speaker of the House of Representatives now?',
 ARRAY['Visit uscis.gov/citizenship/testupdates for the name of the Speaker of the House of Representatives.'],
 'system_of_government', 'standard'),

-- ============================================================
-- C: Rights and Responsibilities (Q48–57)
-- ============================================================

-- 48
('There are four amendments to the Constitution about who can vote. Describe one of them.',
 ARRAY['Citizens eighteen (18) and older (can vote).', 'You don''t have to pay (a poll tax) to vote.', 'Any citizen can vote. (Women and men can vote.)', 'A male citizen of any race (can vote).'],
 'rights_and_responsibilities', 'standard'),

-- 49
('What is one responsibility that is only for United States citizens?',
 ARRAY['serve on a jury', 'vote in a federal election'],
 'rights_and_responsibilities', 'standard'),

-- 50
('Name one right only for United States citizens.',
 ARRAY['vote in a federal election', 'run for federal office'],
 'rights_and_responsibilities', 'standard'),

-- 51
('What are two rights of everyone living in the United States?',
 ARRAY['freedom of expression', 'freedom of speech', 'freedom of assembly', 'freedom to petition the government', 'freedom of religion', 'the right to bear arms'],
 'rights_and_responsibilities', 'standard'),

-- 52
('We elect a President for how many years?',
 ARRAY['four (4)'],
 'rights_and_responsibilities', 'standard'),

-- 53
('What do we show loyalty to when we say the Pledge of Allegiance?',
 ARRAY['the United States', 'the flag'],
 'rights_and_responsibilities', 'standard'),

-- 54
('What is one promise you make when you become a United States citizen?',
 ARRAY['give up loyalty to other countries', 'defend the Constitution and laws of the United States', 'obey the laws of the United States', 'serve in the U.S. military (if needed)', 'serve (do important work for) the nation (if needed)', 'be loyal to the United States'],
 'rights_and_responsibilities', 'standard'),

-- 55
('How old do citizens have to be to vote for President?',
 ARRAY['eighteen (18) and older'],
 'rights_and_responsibilities', 'standard'),

-- 56
('What are two ways that Americans can participate in their democracy?',
 ARRAY['vote', 'join a political party', 'help with a campaign', 'join a civic group', 'join a community group', 'give an elected official your opinion on an issue', 'call Senators and Representatives', 'publicly support or oppose an issue or policy', 'run for office', 'write to a newspaper'],
 'rights_and_responsibilities', 'standard'),

-- 57
('When is the last day you can send in federal income tax forms?',
 ARRAY['April 15'],
 'rights_and_responsibilities', 'standard'),

-- ============================================================
-- AMERICAN HISTORY
-- A: Colonial Period and Independence (Q58–70)
-- ============================================================

-- 58
('When is Independence Day?',
 ARRAY['July 4'],
 'colonial_period_and_independence', 'standard'),

-- 59
('What happened at the Constitutional Convention?',
 ARRAY['The Constitution was written.', 'The Founding Fathers wrote the Constitution.'],
 'colonial_period_and_independence', 'standard'),

-- 60
('When was the Constitution written?',
 ARRAY['1787'],
 'colonial_period_and_independence', 'standard'),

-- 61
('The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.',
 ARRAY['(James) Madison', '(Alexander) Hamilton', '(John) Jay', 'Publius'],
 'colonial_period_and_independence', 'standard'),

-- 62
('What is one thing Benjamin Franklin is famous for?',
 ARRAY['U.S. diplomat', 'oldest member of the Constitutional Convention', 'first Postmaster General of the United States', 'writer of "Poor Richard''s Almanac"', 'started the first free libraries'],
 'colonial_period_and_independence', 'standard'),

-- 63
('Who is the "Father of Our Country"?',
 ARRAY['(George) Washington'],
 'colonial_period_and_independence', 'standard'),

-- 64
('Who was the first President?',
 ARRAY['(George) Washington'],
 'colonial_period_and_independence', 'standard'),

-- 65
('What territory did the United States buy from France in 1803?',
 ARRAY['the Louisiana Territory', 'Louisiana'],
 'colonial_period_and_independence', 'standard'),

-- 66
('Name one war fought by the United States in the 1800s.',
 ARRAY['War of 1812', 'Mexican-American War', 'Civil War', 'Spanish-American War'],
 'colonial_period_and_independence', 'standard'),

-- 67
('Name the U.S. war between the North and the South.',
 ARRAY['the Civil War', 'the War between the States'],
 'colonial_period_and_independence', 'standard'),

-- 68
('Name one problem that led to the Civil War.',
 ARRAY['slavery', 'economic reasons', 'states'' rights'],
 'colonial_period_and_independence', 'standard'),

-- 69
('What was one important thing that Abraham Lincoln did?',
 ARRAY['freed the slaves (Emancipation Proclamation)', 'saved (or preserved) the Union', 'led the United States during the Civil War'],
 'colonial_period_and_independence', 'standard'),

-- 70
('What did the Emancipation Proclamation do?',
 ARRAY['freed the slaves', 'freed slaves in the Confederacy', 'freed slaves in the Confederate states', 'freed slaves in most Southern states'],
 'colonial_period_and_independence', 'standard'),

-- ============================================================
-- B: The 1800s (Q71–75)
-- ============================================================

-- 71
('What did Susan B. Anthony do?',
 ARRAY['fought for women''s rights', 'fought for civil rights'],
 'the_1800s', 'standard'),

-- 72
('Name one war fought by the United States in the 1900s.',
 ARRAY['World War I', 'World War II', 'Korean War', 'Vietnam War', '(Persian) Gulf War'],
 'the_1800s', 'standard'),

-- 73
('Who was President during World War I?',
 ARRAY['(Woodrow) Wilson'],
 'the_1800s', 'standard'),

-- 74
('Who was President during the Great Depression and World War II?',
 ARRAY['(Franklin) Roosevelt'],
 'the_1800s', 'standard'),

-- 75
('Who did the United States fight in World War II?',
 ARRAY['Japan, Germany, and Italy'],
 'the_1800s', 'standard'),

-- ============================================================
-- C: Recent American History and Other Important
--    Historical Information (Q76–81)
-- ============================================================

-- 76
('Before he was President, Eisenhower was a general. What war was he in?',
 ARRAY['World War II'],
 'recent_american_history', 'standard'),

-- 77
('During the Cold War, what was the main concern of the United States?',
 ARRAY['Communism'],
 'recent_american_history', 'standard'),

-- 78
('What movement tried to end racial discrimination?',
 ARRAY['civil rights (movement)'],
 'recent_american_history', 'standard'),

-- 79
('What did Martin Luther King, Jr. do?',
 ARRAY['fought for civil rights', 'worked for equality for all Americans'],
 'recent_american_history', 'standard'),

-- 80
('What major event happened on September 11, 2001, in the United States?',
 ARRAY['Terrorists attacked the United States.'],
 'recent_american_history', 'standard'),

-- 81
('Name one American Indian tribe in the United States.',
 ARRAY['Cherokee', 'Navajo', 'Sioux', 'Chippewa', 'Choctaw', 'Pueblo', 'Apache', 'Iroquois', 'Creek', 'Blackfeet', 'Seminole', 'Cheyenne', 'Arawak', 'Shawnee', 'Mohegan', 'Huron', 'Oneida', 'Lakota', 'Crow', 'Teton', 'Hopi', 'Inuit'],
 'recent_american_history', 'standard'),

-- ============================================================
-- INTEGRATED CIVICS
-- A: Geography (Q82–88)
-- ============================================================

-- 82
('Name one of the two longest rivers in the United States.',
 ARRAY['Missouri (River)', 'Mississippi (River)'],
 'geography', 'standard'),

-- 83
('What ocean is on the West Coast of the United States?',
 ARRAY['Pacific (Ocean)'],
 'geography', 'standard'),

-- 84
('What ocean is on the East Coast of the United States?',
 ARRAY['Atlantic (Ocean)'],
 'geography', 'standard'),

-- 85
('Name one U.S. territory.',
 ARRAY['Puerto Rico', 'U.S. Virgin Islands', 'American Samoa', 'Northern Mariana Islands', 'Guam'],
 'geography', 'standard'),

-- 86
('Name one state that borders Canada.',
 ARRAY['Maine', 'New Hampshire', 'Vermont', 'New York', 'Pennsylvania', 'Ohio', 'Michigan', 'Minnesota', 'North Dakota', 'Montana', 'Idaho', 'Washington', 'Alaska'],
 'geography', 'standard'),

-- 87
('Name one state that borders Mexico.',
 ARRAY['California', 'Arizona', 'New Mexico', 'Texas'],
 'geography', 'standard'),

-- 88
('What is the capital of the United States?',
 ARRAY['Washington, D.C.'],
 'geography', 'standard'),

-- ============================================================
-- B: Symbols (Q89–95)
-- ============================================================

-- 89
('Where is the Statue of Liberty?',
 ARRAY['New York (Harbor)', 'Liberty Island', 'New Jersey', 'near New York City', 'on the Hudson (River)'],
 'symbols', 'standard'),

-- 90
('Why does the flag have 13 stripes?',
 ARRAY['because there were 13 original colonies', 'because the stripes represent the original colonies'],
 'symbols', 'standard'),

-- 91
('Why does the flag have 50 stars?',
 ARRAY['because there is one star for each state', 'because each star represents a state', 'because there are 50 states'],
 'symbols', 'standard'),

-- 92
('What is the name of the national anthem?',
 ARRAY['The Star-Spangled Banner'],
 'symbols', 'standard'),

-- 93
('What do we call the first ten amendments to the Constitution?',
 ARRAY['the Bill of Rights'],
 'symbols', 'standard'),

-- 94
('Name one of the two longest rivers in the United States.',
 ARRAY['Missouri (River)', 'Mississippi (River)'],
 'symbols', 'standard'),

-- 95
('What is the economic system in the United States?',
 ARRAY['capitalist economy', 'market economy'],
 'symbols', 'standard'),

-- ============================================================
-- C: Holidays (Q96–100)
-- ============================================================

-- 96
('What is the capital of the United States?',
 ARRAY['Washington, D.C.'],
 'holidays', 'standard'),

-- 97
('When do we celebrate Independence Day?',
 ARRAY['July 4'],
 'holidays', 'standard'),

-- 98
('Name two national U.S. holidays.',
 ARRAY['New Year''s Day', 'Martin Luther King, Jr. Day', 'Presidents'' Day', 'Memorial Day', 'Independence Day', 'Labor Day', 'Columbus Day', 'Veterans Day', 'Thanksgiving', 'Christmas'],
 'holidays', 'standard'),

-- 99
('What is one reason colonists came to America?',
 ARRAY['freedom', 'political liberty', 'religious freedom', 'economic opportunity', 'practice their religion', 'escape persecution'],
 'holidays', 'standard'),

-- 100
('Who lived in America before the Europeans arrived?',
 ARRAY['American Indians', 'Native Americans'],
 'holidays', 'standard');
