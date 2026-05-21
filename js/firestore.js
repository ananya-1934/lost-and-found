// js/firestore.js
import { auth, db } from './firebase-init.js';
import { 
    collection, 
    addDoc, 
    getDocs,
    query,
    orderBy,
    where,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const postForm = document.getElementById('post-item-form');
if (postForm) {
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Ensure user is logged in
        if (!auth.currentUser) {
            alert("You must be logged in to post an item.");
            window.location.href = 'login.html';
            return;
        }

        const type = document.getElementById('post-type').value;
        const title = document.getElementById('post-title').value;
        const category = document.getElementById('post-category').value;
        const location = document.getElementById('post-location').value;
        const date = document.getElementById('post-date').value;
        const desc = document.getElementById('post-desc').value;
        const btn = postForm.querySelector('button');

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        btn.disabled = true;

        try {
            // Note: In a full app, we would upload the image to Firebase Storage here and get the URL.
            // For now, we will store a placeholder or generic icon logic in the UI.
            
            const docRef = await addDoc(collection(db, "items"), {
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName || auth.currentUser.email,
                type: type,
                title: title,
                category: category,
                location: location,
                date: date,
                description: desc,
                createdAt: serverTimestamp(),
                status: 'active'
            });

            alert("Item successfully reported!");
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error reporting item. Check console for details.");
            btn.innerHTML = 'Submit Report';
            btn.disabled = false;
        }
    });
}

// Function to fetch and render items on the home page
export async function loadItems() {
    const grid = document.getElementById('items-grid');
    if (!grid) return; // Not on the home page

    grid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-muted);"><i class="fas fa-spinner fa-spin"></i> Loading items...</p>';

    try {
        const itemsQuery = query(collection(db, "items"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(itemsQuery);
        
        grid.innerHTML = ''; // Clear loading
        
        if (querySnapshot.empty) {
            grid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-muted);">No items reported yet.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const badgeClass = data.type === 'lost' ? 'badge-lost' : 'badge-found';
            const badgeText = data.type === 'lost' ? 'LOST' : 'FOUND';
            
            // Format time ago (very basic mock)
            const timeString = data.createdAt ? new Date(data.createdAt.toDate()).toLocaleDateString() : 'Just now';

            const card = document.createElement('div');
            card.className = 'item-card glass';
            card.innerHTML = `
                <div class="item-image-placeholder">
                    <span class="badge ${badgeClass}">${badgeText}</span>
                    <i class="fas fa-image fa-3x"></i>
                </div>
                <div class="item-content">
                    <h3 class="item-title">${data.title}</h3>
                    <p class="item-desc">${data.description}</p>
                    <div class="item-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>
                        <span><i class="fas fa-clock"></i> ${timeString}</span>
                    </div>
                    <button class="btn glass contact-btn" style="width: 100%;" data-email="test@test.com">
                        ${data.type === 'lost' ? 'Contact Owner' : 'Claim Item'}
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error("Error fetching items: ", error);
        grid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-muted);">Could not connect to Firebase database. Please check your configuration.</p>';
    }
}

// Call loadItems if we are on the page with the grid
if (document.getElementById('items-grid')) {
    loadItems();
}
