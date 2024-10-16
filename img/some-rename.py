import os

#  из ресурсов получаются файлы с несоотвествующими дотабаф наименованиями 
#  и так может повториться много раз, поэтому вот скрипт для переименования. 
file_names ={
    'centaur': 'centaur-warrunner',
    'doom-bringer': 'doom',
    'life-stealer': 'lifestealer',
    'shredder':'timbersaw',
    'treant':'treant-protector',
    'abyssal-underlord':'underlord',
    'skeleton-king':'wraith-king',
    'nevermore':'shadow-fiend',
    'furion':'natures-prophet',
    'necrolyte':'necrophos',
    'obsidian-destroyer':'outworld-destroyer',
    'queenofpain':'queen-of-pain',
    'zuus':'zeus',
    'rattletrap':'clockwerk',
    'wisp':'io',
    'magnataur':'magnus',
    'vengefulspirit':'vengeful-spirit',
    'windrunner':'windranger',
    # '':'',
    # '':'',

}


for key, value in file_names.items():
# Переименовываем файл
    try:
        os.rename(f'{key}.jpg', f'{value}.jpg')
        print(f'Файл {key}.jpg успешно переименован в {value}.jpg.')
    except FileNotFoundError:
        print(f'Файл {key}.jpg не найден.')
    except Exception as e:
        print(f'Произошла ошибка: {e}')
