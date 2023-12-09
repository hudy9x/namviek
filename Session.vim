let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/code/tutors/mern/kampuni/activity
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +1 packages/shared-models/src/prisma/schema.prisma
badd +54 ./packages//ui-app//app//_features//Activity//ActivityCardAttach.tsx
badd +64 ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
badd +42 ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx
badd +18 ./packages//ui-app//app//_features//Activity//ActivityCreatorAvatar.tsx
badd +9 ./packages//ui-app//app//_features//Activity//ActivityMemberRepresent.tsx
badd +147 ./packages//ui-app//app//_features//Activity//context.tsx
badd +31 packages/shared-models/src/type.ts
badd +35 packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
badd +16 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/example/index.ts
badd +29 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/main.ts
badd +44 packages/be-gateway/src/routes/test2.ts
badd +7 packages/be-gateway/src/core/index.ts
badd +9 packages/be-gateway/src/core/Controller.ts
badd +15 packages/be-gateway/src/core/methods/Get.ts
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/index.ts
badd +1 packages/ui-app/services/activity.ts
badd +14 packages/be-gateway/src/core/Mapper.ts
badd +12 .env
badd +3 packages/be-gateway/src/lib/jwt.ts
badd +1 packages/be-gateway/src/routes/auth/index.ts
badd +36 packages/goalie-nextjs/src/services/auth.ts
badd +6 packages/ui-app/app/_features/Activity/index.tsx
badd +7 packages/ui-app/app/_features/Activity/ActivityContainer.tsx
badd +3 packages/shared-ui/src/components/Controls/ListControl/ListOptions.tsx
badd +120 packages/shared-ui/src/components/Controls/ListControl/index.tsx
badd +1 packages/ui-app/app/_components/PointSelect.tsx
badd +44 packages/shared-ui/src/components/Controls/type.ts
badd +20 packages/ui-app/app/_features/Activity/ActivityList.tsx
badd +1 packages/ui-app/app/_components/EmojiInput/index.tsx
badd +55 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/core/AppRoutes.ts
badd +49 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app//[orgID]/project//[projectId]/TaskForm.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/app//[orgID]/project//[projectId]/TaskUpdate.tsx
badd +1 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/ui-app/services/task.ts
badd +616 packages/be-gateway/src/routes/task/index.ts
badd +1 package.json
badd +2 packages/shared-models/src/index.ts
badd +11 packages/shared-models/src/lib/activity.ts
badd +12 /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/shared-ui/src/components/Controls/index.tsx
badd +96 packages/ui-app/app/_components/StatusSelectMultiple.tsx
badd +121 packages/ui-app/app/_components/ProjectSelectMultiple.tsx
badd +113 packages/ui-app/app/_features/Activity/ActivityLog.tsx
badd +1 packages/be-gateway/src/routes/activity/index.ts
badd +1 ~/Documents/qwe/projects/x-ray-data-prepare/guide.md
badd +1 ~/code/projects/23-QLMD/23-QLMD-FE/src/pages/ql-vung-mien/ql-vung-mien.tsx
badd +1 ~/code/projects/23-QLMD/23-QLMD-FE/src/contexts/navigation.tsx
badd +1 ~/code/projects/23-QLMD/23-QLMD-FE/src/app-navigation.tsx
badd +1 ~/code/projects/23-QLMD/23-QLMD-FE/.env.nam
badd +59 packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx
badd +26 packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx
badd +149 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/TaskForm.tsx
badd +11 packages/ui-app/store/member.ts
badd +4 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectContainer.tsx
badd +71 packages/be-gateway/src/routes/member/index.ts
badd +0 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/page.tsx
badd +81 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Project/List/index.tsx
badd +29 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx
badd +3 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/TaskList.tsx
badd +44 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectTabContent.tsx
badd +0 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx
badd +26 packages/ui-app/app/_features/Activity/ActivityCard.tsx
badd +9 packages/ui-app/app/_features/Activity/style.css
badd +56 ~/code/tutors/mern/kampuni/activity/packages/shared-ui/src/components/Controls/TextEditorControl/index.tsx
badd +0 ~/code/tutors/mern/kampuni/activity/packages/shared-ui/src/components/Controls/TextEditorControl/style.css
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/shared-models/src/prisma/schema.prisma
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 61 + 103) / 207)
exe 'vert 2resize ' . ((&columns * 145 + 103) / 207)
argglobal
balt ./packages//ui-app//app//_features//Activity//context.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 16 - ((15 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 03|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/type.ts", ":p")) | buffer packages/shared-models/src/type.ts | else | edit packages/shared-models/src/type.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/type.ts
endif
balt packages/shared-models/src/prisma/schema.prisma
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 31 - ((0 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 31
normal! 019|
wincmd w
exe 'vert 1resize ' . ((&columns * 61 + 103) / 207)
exe 'vert 2resize ' . ((&columns * 145 + 103) / 207)
tabnext
edit packages/ui-app/app/_features/Activity/ActivityCard.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 1resize ' . ((&columns * 68 + 103) / 207)
exe '2resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 2resize ' . ((&columns * 69 + 103) / 207)
exe '3resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 68 + 103) / 207)
exe '4resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 4resize ' . ((&columns * 103 + 103) / 207)
exe '5resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 5resize ' . ((&columns * 103 + 103) / 207)
argglobal
balt ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 27 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 27
normal! 05|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/style.css", ":p")) | buffer packages/ui-app/app/_features/Activity/style.css | else | edit packages/ui-app/app/_features/Activity/style.css | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/style.css
endif
balt ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 10 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityList.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityList.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityList.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityList.tsx
endif
balt ./packages//ui-app//app//_features//Activity//ActivityCardComment.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 22 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 22
normal! 025|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityCardCommentContent.tsx
endif
balt ./packages//ui-app//app//_features//Activity//ActivityCommentEditor.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 35 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 35
normal! 031|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityTimeLog.tsx
endif
balt packages/ui-app/app/_features/Activity/ActivityCard.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 60 - ((10 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 60
normal! 0104|
wincmd w
exe '1resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 1resize ' . ((&columns * 68 + 103) / 207)
exe '2resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 2resize ' . ((&columns * 69 + 103) / 207)
exe '3resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 68 + 103) / 207)
exe '4resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 4resize ' . ((&columns * 103 + 103) / 207)
exe '5resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 5resize ' . ((&columns * 103 + 103) / 207)
tabnext
edit packages/ui-app/services/activity.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 13 + 23) / 46)
exe '2resize ' . ((&lines * 29 + 23) / 46)
exe 'vert 2resize ' . ((&columns * 62 + 103) / 207)
exe '3resize ' . ((&lines * 29 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 144 + 103) / 207)
argglobal
balt /mnt/Data/code/fullstack/kampuni-area/activity@v1/packages/be-gateway/src/routes/activity/index.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 25 - ((5 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 25
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/shared-models/src/lib/activity.ts", ":p")) | buffer packages/shared-models/src/lib/activity.ts | else | edit packages/shared-models/src/lib/activity.ts | endif
if &buftype ==# 'terminal'
  silent file packages/shared-models/src/lib/activity.ts
endif
balt packages/be-gateway/src/routes/test2.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 16 - ((1 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 16
normal! 014|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/task/index.ts", ":p")) | buffer packages/be-gateway/src/routes/task/index.ts | else | edit packages/be-gateway/src/routes/task/index.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/task/index.ts
endif
balt packages/be-gateway/src/core/methods/Get.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 639 - ((0 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 639
normal! 013|
wincmd w
exe '1resize ' . ((&lines * 13 + 23) / 46)
exe '2resize ' . ((&lines * 29 + 23) / 46)
exe 'vert 2resize ' . ((&columns * 62 + 103) / 207)
exe '3resize ' . ((&lines * 29 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 144 + 103) / 207)
tabnext
edit packages/be-gateway/src/routes/activity/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 60 + 103) / 207)
exe 'vert 2resize ' . ((&columns * 146 + 103) / 207)
argglobal
balt packages/ui-app/services/activity.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 89 - ((23 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 89
normal! 035|
wincmd w
argglobal
if bufexists(fnamemodify("packages/be-gateway/src/routes/test2.ts", ":p")) | buffer packages/be-gateway/src/routes/test2.ts | else | edit packages/be-gateway/src/routes/test2.ts | endif
if &buftype ==# 'terminal'
  silent file packages/be-gateway/src/routes/test2.ts
endif
balt packages/be-gateway/src/routes/activity/index.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 45 - ((0 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 45
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 60 + 103) / 207)
exe 'vert 2resize ' . ((&columns * 146 + 103) / 207)
tabnext
edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 44 + 103) / 207)
exe 'vert 2resize ' . ((&columns * 80 + 103) / 207)
exe '3resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 81 + 103) / 207)
exe '4resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 4resize ' . ((&columns * 81 + 103) / 207)
argglobal
enew
file NvimTree_5
balt packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/TaskList.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 91 - ((20 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 91
normal! 033|
wincmd w
argglobal
if bufexists(fnamemodify("~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx", ":p")) | buffer ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx | else | edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx | endif
if &buftype ==# 'terminal'
  silent file ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx
endif
balt packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 28 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 28
normal! 09|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx", ":p")) | buffer packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx | else | edit packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx
endif
balt ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 74 - ((9 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 74
normal! 012|
wincmd w
exe 'vert 1resize ' . ((&columns * 44 + 103) / 207)
exe 'vert 2resize ' . ((&columns * 80 + 103) / 207)
exe '3resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 3resize ' . ((&columns * 81 + 103) / 207)
exe '4resize ' . ((&lines * 21 + 23) / 46)
exe 'vert 4resize ' . ((&columns * 81 + 103) / 207)
tabnext 3
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
