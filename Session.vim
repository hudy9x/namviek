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
badd +6 packages/ui-app/app/_features/Activity/index.tsx
badd +7 packages/ui-app/app/_features/Activity/ActivityList.tsx
badd +21 packages/ui-app/app/_features/Activity/ActivityCardComment.tsx
badd +19 packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx
badd +0 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
badd +2 packages/shared-models/src/prisma/schema.prisma
badd +26 packages/shared-models/src/type.ts
badd +205 packages/be-gateway/src/routes/activity/index.ts
badd +172 packages/be-gateway/src/routes/auth/index.ts
badd +503 packages/be-gateway/src/routes/task/index.ts
badd +90 packages/ui-app/app/[orgID]/project/[projectId]/TaskUpdate.tsx
badd +150 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/TaskForm.tsx
badd +13 packages/ui-app/app/_features/Automation/index.tsx
badd +117 packages/ui-app/app/[orgID]/project/[projectId]/ProjectNav.tsx
badd +12 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityMember.tsx
badd +84 packages/ui-app/app/_components/MemberPicker/index.tsx
badd +43 packages/ui-app/app/_features/Project/List/index.tsx
badd +0 packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx
badd +0 packages/ui-app/app/_components/MemberAvatar.tsx
badd +3 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardHeader.tsx
badd +0 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/style.css
badd +5 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/style.css
badd +13 packages/shared-ui/src/components/Avatar/index.tsx
badd +18 ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityMemberAvatar.tsx
argglobal
%argdel
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabnew +setlocal\ bufhidden=wipe
tabrewind
edit packages/ui-app/app/_features/Activity/ActivityList.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
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
exe 'vert 1resize ' . ((&columns * 70 + 105) / 210)
exe '2resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 2resize ' . ((&columns * 139 + 105) / 210)
exe '3resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 3resize ' . ((&columns * 69 + 105) / 210)
exe '4resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 4resize ' . ((&columns * 69 + 105) / 210)
argglobal
balt packages/ui-app/app/_features/Activity/index.tsx
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
let s:l = 7 - ((6 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 7
normal! 0
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityCardComment.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityCardComment.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityCardComment.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityCardComment.tsx
endif
balt ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityMemberAvatar.tsx
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
let s:l = 18 - ((11 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 024|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx", ":p")) | buffer packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx | else | edit packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx
endif
balt ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
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
let s:l = 10 - ((9 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 021|
wincmd w
argglobal
if bufexists(fnamemodify("~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/style.css", ":p")) | buffer ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/style.css | else | edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/style.css | endif
if &buftype ==# 'terminal'
  silent file ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/style.css
endif
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
let s:l = 5 - ((4 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 5
normal! 028|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 70 + 105) / 210)
exe '2resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 2resize ' . ((&columns * 139 + 105) / 210)
exe '3resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 3resize ' . ((&columns * 69 + 105) / 210)
exe '4resize ' . ((&lines * 23 + 25) / 50)
exe 'vert 4resize ' . ((&columns * 69 + 105) / 210)
tabnext
edit packages/shared-ui/src/components/Avatar/index.tsx
argglobal
balt packages/ui-app/app/_features/Activity/ActivityCardAttach.tsx
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
let s:l = 10 - ((9 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 033|
tabnext
edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/TaskForm.tsx
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
exe 'vert 1resize ' . ((&columns * 105 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 104 + 105) / 210)
argglobal
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
let s:l = 2 - ((1 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 2
normal! 018|
wincmd w
argglobal
if bufexists(fnamemodify("~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/style.css", ":p")) | buffer ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/style.css | else | edit ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/style.css | endif
if &buftype ==# 'terminal'
  silent file ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/[orgID]/project/[projectId]/style.css
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
let s:l = 10 - ((9 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 015|
wincmd w
exe 'vert 1resize ' . ((&columns * 105 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 104 + 105) / 210)
tabnext
edit packages/ui-app/app/_components/MemberAvatar.tsx
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
exe 'vert 1resize ' . ((&columns * 105 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 104 + 105) / 210)
argglobal
balt packages/ui-app/app/_components/MemberPicker/index.tsx
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
let s:l = 21 - ((20 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 21
normal! 08|
wincmd w
argglobal
if bufexists(fnamemodify("packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx", ":p")) | buffer packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx | else | edit packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx | endif
if &buftype ==# 'terminal'
  silent file packages/ui-app/app/[orgID]/project/[projectId]/views/ListMode.tsx
endif
balt packages/ui-app/app/_features/Project/List/index.tsx
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
let s:l = 159 - ((33 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 159
normal! 028|
wincmd w
exe 'vert 1resize ' . ((&columns * 105 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 104 + 105) / 210)
tabnext
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
exe 'vert 1resize ' . ((&columns * 105 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 104 + 105) / 210)
argglobal
balt ~/code/tutors/mern/kampuni/activity/packages/ui-app/app/_features/Activity/ActivityCardAttachContent.tsx
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
let s:l = 64 - ((35 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 64
normal! 023|
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
let s:l = 27 - ((26 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 27
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 105 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 104 + 105) / 210)
tabnext
edit packages/be-gateway/src/routes/activity/index.ts
argglobal
balt packages/shared-models/src/type.ts
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
let s:l = 11 - ((10 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 11
normal! 015|
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
